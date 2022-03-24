import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const fauxworkercardarray = [
  {
    category: "QA-default",
    creator: "Annonymous",
    dateCreated: "12345",
    description: "This is a testing Worker Profile",
    id: "1n",
    lastDeploymentId: "git-1234",
    lastTouch: "67890",
    name: "Worker 1"
  },
  {
    category: "QA-default",
    creator: "Annonymous",
    dateCreated: "65000",
    description: "This is another testing Worker Profile",
    id: "2n",
    lastDeploymentId: "git-4321",
    lastTouch: "09876",
    name: "Worker 2"
  }
]

const Widget = ({ name, description }) => {

  // the first arg to useState is always the current state val; the second arg is the function that will
  // allow us to update that state
  const [count, setCount] = useState(0)

  return (
    <div className="widget">
      <ul>
          {
            fauxworkercardarray.map(worker => (
              <>
              <li>DFXWorker ID: {worker.id}</li>
              <li>DFXWorker Name: {worker.name}</li>
              <li>DOB: {worker.dateCreated}</li>
              <li>Notes: {worker.description}</li>
              <li>Category: {worker.category}</li>
              <li>Last Interaction: {worker.lastTouch}</li>
              <li>Most Recent Deployment: {worker.lastDeploymentId}</li>
              </>
            ))
          }
      </ul>
    </div>
  )
}

Widget.defaultProps = {
  name: 'Unnamed DFXWorker',
  description: 'You should assign me a name for good housekeeping'
}

export default Widget