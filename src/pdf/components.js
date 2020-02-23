// @flow
import * as React from 'react'

export const NumberedContent = ({
  children,
  number
}: {
  children: React$Node,
  number: number
}) => (
  <div className="numbered-content">
    <div className="number">
      <p>{number}.</p>
    </div>
    <div className="content">{children}</div>
  </div>
)

export const CheckHere = ({text}: {text: string}) => (
  <div className="check-here">
    (<span className="underline">{text}</span>)
  </div>
)
