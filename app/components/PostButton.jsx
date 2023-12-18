'use client'

import { Button } from "@mui/material"

export default function PostButton() {

  async function handleClick() {
    // await fetch('http://localhost:3000/examples', { method: 'POST' }).then((res) => {
    //   // console.log({data})
    //   res.json().then((data) => console.log({ data }))
    // }).catch(() => {
    //   console.log('An error occured')
    // })
    const res = await fetch('http://localhost:3000/examples', { method: 'POST' })
    const data = await res.json()
    console.log({ data })
  }

  return (
    <Button data-test='post-button' onClick={handleClick}>
      Post Data
    </Button>
  )
}