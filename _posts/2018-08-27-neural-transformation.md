---
title: Geometric Transformations with Autoencoders
date: 2018-08-26 00:30:00 Z
tags:
- Deep Learning
- Autoencoder
- Keras
layout: post
excerpt: My attempt at disentanglement learning
image: images/stock/3.jpg
---

During my last semester at BITS I was working with [Prof. Tiwari](http://ktiwari.in/) on indexing iris images. Unfortunately, given the short time frame, we could not complete the project, however here I would share some experiments I enjoyed performing.

The traditional pre-processing pipeline for iris images includes two stages, segmentation and normalization with Daugman's rubber sheet model.

<figure>
    <img style="width:70%" src="/images/posts/transforms/daugman_1.png" />
     <figsource>Credits: <a target="_blank" href="https://www.worldscientific.com/doi/abs/10.1142/S0218001415560169">Al-Zubi et al.</a></figsource>
    <figcaption><b>Figure 1:</b> Daugman's rubber sheet model</figcaption>
</figure>

<figure>
    <img src="/images/posts/transforms/daugman_2.jpeg" />
     <figsource>Credits: <a target="_blank" href="https://ieeexplore.ieee.org/document/5304768/">Han et al.</a></figsource>
    <figcaption><b>Figure 2:</b> Normalized iris image</figcaption>
</figure>

What makes dealing with normalized iris images difficult is the horizontal translation which exists between the normalized samples of the same iris. [Hom et al.](http://openaccess.thecvf.com/content_ICCV_2017/papers/Zhao_Towards_More_Accurate_ICCV_2017_paper.pdf) use Fully Convolutional Network (FCN) to obtain a 2-D feature map and accounts for the translation at the matching time. But this approach has an *O(n)* time complexity making it less suitable for matching indexing of large database. We wanted to use dense features with a staged regression model as described by [Kraska et al.](https://arxiv.org/pdf/1712.01208.pdf) for a possibility of *O(1)* lookup.

<figure>
    <img style="width:58%"                      src="/images/posts/transforms/horizontal-translation-iris.png" />
    <figsource>Credits: <a target="_blank" href="http://openaccess.thecvf.com/content_ICCV_2017/papers/Zhao_Towards_More_Accurate_ICCV_2017_paper.pdf"> Hom et al.</a></figsource>
    <figcaption><b>Figure 3:</b> Horizontal translation in normalized iris images</figcaption>
</figure>

In their paper on robotic grasping [Levin et al.](https://arxiv.org/pdf/1603.02199.pdf) add a motor command vector, a one-hot vector to an intermediate layer in CNN by tiling it to the same dimensions. I decided to use this cool trick to train an autoencoder like architecture to perform
translation and hopefully learn some translation invariant features.

<figure>
    <img style="width:50%" src="/images/posts/transforms/vector-addtion-block.png" />
    <figcaption><b>Figure 4:</b> Vector addition block</figcaption>
</figure>

Before trying with the iris images I decided to verify if the technique could work on simpler dataset. So I did a couple of experiments with MNIST and Fashion-MNIST. We train the encoder in the standard way,
however we pass an extra 14-D one-hot vector to the decoder which represents the number of pixels the image is supposed to be translated by. In case of MNIST since every image is 28x28 pixels, we allow shift in quantums of 2 pixels hence creating 14 different possible outcomes.

<figure>
    <img src="/images/posts/transforms/mnist-translation.png" />
    <figcaption><b>Figure 5:</b> Schematic representation of MNIST translation network</figcaption>
</figure>

To prepare the training data we create five translated images with random corresponding every image in the MNIST train split.

```py
def translate_data(X, number_of_samples=5):
    """
    Takes images from MNIST dataset as input
    and transforms them to create new to datset.

    :param X: (n, 28, 28) array containing original MNIST images
    :param number_of_samples: Number of samples to be generated from
                              each input image.
    :return: tuple of ((new_x, translation_vectors), new_y)
            new_x: (n * number_of_samples, 28, 28) array containing
                         images from the original datset.
            translation_vectors: (14,) one-hot array containing the amount
                                of translation applied to each corresponding
                                image in new_y
            new_y: (n * number_of_samples, 28, 28) array containing
                         translated images.
    """
    new_x = []
    new_y = []
    translation_vectors = []

    for i in range(X.shape[0]):
        for _ in range(number_of_samples):
            translation = np.random.randint(0, 14) * 2
            # Copy image to new_x as it is
            new_x.append(X[i])
            # Perform translation and add image to new_y
            new_y.append(
                np.hstack([X[i, :, translation:],
                           X[i, :, :translation]]))
            translation_vector = np.zeros(14)
            translation_vector[translation // 2] = 1
            translation_vectors.append(translation_vector)

    new_x, translation_vectors, new_y = np.asarray(new_x), \
                                        np.asarray(translation_vectors), \
                                        np.asarray(new_y)

    return ((new_x, translation_vectors), new_y)
```

We then define the encoder network as a simple CNN,

```py
def get_encoded(input_img):
    """
    Defines the encoder network.
    :param input_image: A tensor containing input image
    :return: Tensor representing the encoded image
    """
    x = Conv2D(16, (3, 3), activation='relu', padding='same')(input_img)
    x = BatchNormalization()(x)
    x = MaxPooling2D((2, 2), padding='same')(x)
    x = Conv2D(14, (3, 3), activation='relu', padding='same')(x)
    x = MaxPooling2D((2, 2), padding='same')(x)
    x = Conv2D(14, (3, 3), activation='relu', padding='same')(x)
    x = BatchNormalization()(x)
    x = MaxPooling2D((2, 2), padding='same')(x)
    x = Conv2D(14, (3, 3), activation='relu', padding='same')(x)
    encoded = MaxPooling2D((2, 2), padding='same')(x)

    return encoded
```

Since defining the decoder all at once could be a mouthful we create a helper method
which returns us the convolution and addition block.

```py
def convolve_and_add(x, translation_vector_reshaped, image_dim, num_filters=14):
    """
    Defines the convolution and add block.
    :param x: Input tensor
    :param translation_vector_reshaped: Shape input reshaped as (1, 1, 14) tensor
    :param image_dim: The dimension of input tensor, assuming the
                      image hight and width are same
    :param num_filters: Number of filters in each convolution layer
    :return: Output tensor
    """
    #Sun
    get_tiling_lambda = lambda: Lambda(lambda x: K.tile(x, [1, image_dim, image_dim, 1]))
    
    x = Conv2D(num_filters, (3, 3), activation='relu', padding='same')(x)
    translation_vector_tiled = get_tiling_lambda()(translation_vector_reshaped)
    x = Add()([x, translation_vector_tiled])
    x = Conv2D(num_filters, (3, 3), activation='relu', padding='same')(x)
    translation_vector_tiled = get_tiling_lambda()(translation_vector_reshaped)
    x = Add()([x, translation_vector_tiled])
    x = Conv2D(num_filters, (3, 3), activation='relu', padding='same')(x)
    translation_vector_tiled = get_tiling_lambda()(translation_vector_reshaped)
    x = Add()([x, translation_vector_tiled])
    x = BatchNormalization()(x)

    return x
```

Then we define decoder network using `convolve_and_add` as,

```py
def get_decoded(encoded, translation_vector):
    """
    Defines the decoder network.
    :param encoded: Tensor representing the encoded image
    :param translation_vector: One-hot vector representing the translation amount
    :return: Decoded image
    """
    translation_vector_reshaped = Reshape((1, 1, 14))(translation_vector)

    #### Block 1 ####
    # Convolution
    x = Conv2D(36, (3, 3), activation='relu', padding='same')(encoded)
    x = Conv2D(36, (3, 3), activation='relu', padding='same')(x)
    x = Conv2D(36, (3, 3), activation='relu', padding='same')(x)
    x = BatchNormalization()(x)
    # Upsample
    x = Conv2D(14, (3, 3), activation='relu', padding='same')(x)
    x = UpSampling2D((2, 2))(x)

    #### Block 2 ####
    # Convolve and Add
    x = convolve_and_add(x, translation_vector_reshaped, 4)
    # Upsample
    x = Conv2D(14, (3, 3), activation='relu', padding='same')(x)
    x = UpSampling2D((2, 2))(x)

    #### Block 3 ####
    # Convolve and Add
    x = convolve_and_add(x, translation_vector_reshaped, 8)
    # Upsample
    x = Conv2D(14, (3, 3), activation='relu', padding='same')(x)
    x = UpSampling2D((2, 2))(x)

    #### Block 4 ####
    # Convolve and Add
    x = convolve_and_add(x, translation_vector_reshaped, 16)
    # Upsample
    x = Conv2D(32, (3, 3), activation='relu')(x)
    x = UpSampling2D((2, 2))(x)

    #### Block 5 ####
    # Convolution
    x = Conv2D(32, (3, 3), activation='relu', padding='same')(x)
    x = Conv2D(32, (3, 3), activation='relu', padding='same')(x)
    x = Conv2D(32, (3, 3), activation='relu', padding='same')(x)

    decoded = Conv2D(1, (3, 3), activation='sigmoid', padding='same', name='last_conv')(x)

    return decoded
```

This gives in surprisingly neat results.

<figure>
    <img style="width:80%" src="/images/posts/transforms/mnist-translation-output.png" />
    <figcaption><b>Figure 6:</b> Result of the autoencoder on translation task</figcaption>
</figure>

Then I decided to repeat the experiment but this time trying to rotate the digits.

<figure>
    <img style="width:80%" src="/images/posts/transforms/mnist-rotation-output.png" />
    <figcaption><b>Figure 7:</b> Result of the autoencoder on rotation task</figcaption>
</figure>

Then as a harder benchmark I tried to train it on Fashion-MNIST. On the translation task
we lose some details but it gets the outlines right for the most part. As our primary
objective was translation, I did not repeat the experiment on rotation task.

<figure>
    <img style="width:80%" src="/images/posts/transforms/fmnist-translation-output.png" />
    <figcaption><b>Figure 8:</b> Result of the autoencoder on Fashion-MNIST translation task</figcaption>
</figure>

The Google Colab notebook for the MNIST translation task is available [here](https://colab.research.google.com/drive/1hvf6VssjzgJssax4OdNg1hlMhWj9tQc2), where you
can [train the network with cloud GPUs](https://medium.com/deep-learning-turkey/google-colab-free-gpu-tutorial-e113627b9f5d). Though,
ultimately I was unable to use the method on iris images, I thoroughly enjoyed performing these
experiments.