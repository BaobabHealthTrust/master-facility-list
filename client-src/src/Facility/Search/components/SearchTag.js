//@flow
import React from "react";

type Props = {
  id: number,
  actionType: string,
  name: string,
  removeSearchValues: Function
}

export default (props: Props) => {
  const { id, actionType, name, removeSearchValues } = props
  return (
    <div className="chip">
      {name}
      <i
        onClick={() => removeSearchValues(id, actionType)}
        className="mfl-close material-icons"
      >close</i>
    </div>
  )
}
