import React from 'react'

interface Props {
  username: string
}

const ReactGithubCalendar: React.FC<Props> = ({ username }) => {
  return (
    <div className="github-calendar-placeholder">
      {/* GitHub calendar would go here */}
      <p className="text-sm text-foreground/40">GitHub contributions for @{username}</p>
    </div>
  )
}

export default ReactGithubCalendar