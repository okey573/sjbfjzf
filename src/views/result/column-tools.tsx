export const renderPercentage = ({ text }: {text: number}) => {
  // @ts-ignore
  return <span>{(text * 100).toFixed(2) + '%'}</span>
}


export const renderRatio = ({ text }: {text: number}) => {
  const className = text > 0 ? 'positive' : text < 0 ? 'negative' : ''
  // @ts-ignore
  return <span class={className}>{(text * 100).toFixed(2) + '%'}</span>
}

export const renderNumber = ({ text }: {text: number}) => {
  // @ts-ignore
  return <span>{text.toFixed(2)}</span>
}

export const renderProfit = ({ text }: {text: number}) => {
  const className = text > 0 ? 'positive' : text < 0 ? 'negative' : ''
  // @ts-ignore
  return <span class={className}>{text.toFixed(2)}</span>
}
