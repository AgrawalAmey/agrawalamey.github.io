---
title: Speeding up graphics intense websites
date: 2017-01-07 00:00:00 Z
tags:
- Web Technologies
- UI/UX
- Design
- Tips
layout: post
excerpt: Tips and tricks to make websites load faster.
image: images/projects/apogee.png
crosspost_to_medium: true
---

College fests are irreplaceable delights of a college student's life. Each college tries to make its fest bigger yet different than others' and so is case with fest websites. These fest websites stand as expression of creativity of its makers which more often than not leads to a large page load time and poor user experience. While working on websites for <a target='_blank' href="http://bits-oasis.org/2015main/"> Oasis </a> and <a target='_blank' href="http://bits-apogee.org/2016/"> Apogee </a> at Department of Visual Media, I explored a few techniques to make the sites faster. Here are a few of them. Both graphics designers and front-end developers might find the blog helpful.

### 1. Choose the right file format
This is the most basic yet the most effective step of all. With improved browser rendering engines, SVG files have gained popularity in the web design domain. Being vectors they scale up with screen sizes without any depreciation in quality and they are lightweight. As a bonus they support animations and JavaScript interactions.

But sometimes designs contain textures which cannot be recreated in vectors, in such situations one has to choose between JPEG and PNG? This question does not have a generic answer as JPEG uses lossy data compression unlike PNG and hence is always smaller in size but the lossy compression has it's own implications. For example, text in JPEG images is blurred out on edges. PNG also supports the use of transparency which makes its use as a necessity at times.

Just choosing the right file format can save up of to 80% payload in images.

### 2. Select the right export settings

Many designers tend to ignore this part which can actually turn out to be very crucial while exporting to raster formats (JPEG and PNG). Typically printers use CMYK colors (32 bit) and hence a lot of design tools export using this format by default. This leads to a problem when rendering on the web as it only supports RGB colors (24 bit) although, a browser would display a CMYK image it cannot reproduce the exact colors. Apart from this, JPEG also supports grayscale colors (8 bit). Progressive and Optimized JPEGs can provide significant reduction in size. As a rule of thumb you might use baseline optimized JPEGs but I strongly suggest going through <a target='_blank' href="https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiDpYncjLDRAhXFOo8KHVvLBs8QFggZMAA&url=https%3A%2F%2Fforums.adobe.com%2Fthread%2F1962929&usg=AFQjCNGcfh77OnWkOA99LnDRVfTQ7G0GWQ&sig2=5wkjdUoFPIhqeqCC66PFQg"> [1] </a> and <a target='_blank' href="http://superuser.com/questions/379404/what-is-the-difference-between-progressive-and-optimized-jpegs-in-photostop"> [2] </a>.

PNG provides with four color modes of which 24 bit RGB and 8 bit paletted are of interest to us. Typically you would use RGB colors, but if the image does not contain too many colors 8 bit paletted colors might turn out to be better. Converting the image to 8 bit color mode would entail choosing only the best 256 colors, thus drastically decreasing the size of the image. As a word of caution, using paletted color modes can sometimes increase the size of the image when the dimensions of image are small.

<a target='_blank' href="http://help.adobe.com/en_US/creativesuite/cs/using/WSC7A1F924-DD38-49b4-B84B-EFF50416C860.html"> [3] </a> is a great read about the tweaks discussed above.

### 3. Compress your files

Though file compression is the most obvious step in decreasing page load time, it is still not performed right most of the times. For all your text files HTML, Js, CSS, JSON, etc. "minify" (whitespace removal) is the most popular compression technique available. Though it might appear to be elementary, its aggregate impact could be significant. Most modern text editors like Sublime Text and Atom have plugins for minification. You can also add this to your gulp/grunt build process.  

Different image formats have different compression techniques and there exist great open source utilities like <a target='_blank' href="http://www.kokkonen.net/tjko/projects.html"> JPEGOptim </a> , <a target='_blank' href="http://www.advsys.net/ken/util/pngout.htm"> PNGOUT </a> and <a target='_blank' href="https://github.com/svg/svgol"> SVGO </a> which can decrease the file size by up to 70%. I personally prefer <a target='_blank' href="https://github.com/toy/image_optim"> image_optim </a> which combines all these packages, provides a handy shell interface which works for all image formats and integrates easily into build processes. But setting up image_optim on Windows is tricky, if you are on Windows you might want to install those utilities individually or you could alternatively use <a target='_blank' href="https://tinypng.com/"> TinyPNG </a> for rasters and <a target='_blank' href="https://jakearchibald.github.io/svgomg/"> SVGOMG </a> for SVGs.

Most compression techniques in the above mentioned utilities are lossy hence deal with them cautiously.

### 4. Use gzip compression

Browsers can decode gzip encoded responses from a server. gzip does not help much with raster images but manages to compress text files to about one tenth their original size. This provides massive savings with minimum efforts and gzip compression can be easily enabled on both apache and nginx. <a target='_blank' href="https://varvy.com/pagespeed/enable-compression.html"> [4] </a> explains this process in a simple manner.

Fun fact, SVG files are just XML documents because of which gzip works great on them as well. The complete isometric map of the miniature city on the landing page of Apogee 2016 website mentioned earlier is a single ginormous SVG file of about 2 MBs. SVGO compression decreased it to half and ultimately with gzip it is transferred as a payload of only about 200 KBs.

### 5. Avoid loading multiple fonts

Fonts make websites seem beautiful but they can also make them lethargic. Google Fonts is by and far the best option to load fonts on the web almost all the fonts (or their similar alternatives) are available on Google Fonts. As browsers cache fonts, many a times the Google Fonts font you are trying to load might already be in the user’s cache. Also, we might only need one or two font-weights for a given font which we can choose to load selectively in Google Fonts thus dramatically reducing the size.

If you need a font only for some titles, it might be a good idea to export those as SVGs instead. Though a bit tedious, this leads to big savings as it removes the barrier to your creative ideas.

### 5. Lazy load files

Loading all the content at once might make the loading times large specially in one page sites. Lazy loading files of less importance might turn out to be useful, <a target='_blank' href="http://sourcey.com/recliner/"> Recliner.js </a> is a great tool to achieve the same.

### 6. Decrease the number of requests

Decreasing the number of HTTP requests can make your page load significantly faster. <a target='_blank' href="https://www.giftofspeed.com/fewer-http-requests/"> [5] </a> describes different ways you can achieve the same. Apart from the ones described above, SVG sprites are useful in decreasing number of requests. <a target='_blank' href="https://github.com/jkphl/svg-sprite"> svg-sprite </a> is a useful tool for making SVG sprites.

HTTP/2 would completely change this landscape though, you can read more about it in <a target='_blank' href="https://blog.newrelic.com/2016/02/09/http2-best-practices-web-performance/"> [6]</a>.

### 7. Enable caching
Caching the less frequently changed files makes pages load super-fast for returning users. <a target='_blank' href="https://betterexplained.com/articles/how-to-optimize-your-site-with-http-caching/"> [7]</a> walks through enabling caching in apache, for nginx you might want to refer <a target='_blank' href="https://www.nginx.com/blog/nginx-caching-guide/"> [8]</a>.

I hope that this posts helps in making your sites faster. If you have any suggestions please let me know in the comments below and I will surely take them into consideration next time! :-) Thank you!
