import { Await, defer, Link, useLoaderData } from "@remix-run/react"
import { Suspense } from "react"

export const loader = () => {
  const slowPromise1: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve('slowPromise1 Done')
    }, 1000)
  })
  const slowPromise2: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve('slowPromise2 Done')
    }, 2000)
  })
  const slowPromise3: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
      resolve('slowPromise3 Done')
    }, 3000)
  })

  return defer({
    slowPromise1,
    slowPromise2,
    slowPromise3
  })
}

export default function Info() {
  const {slowPromise1, slowPromise2, slowPromise3} = useLoaderData<typeof loader>()
  return (
    <div>
      <h1 className="text-2xl text-center my-4">Info</h1>
      <ul className="text-center my-8">
        <Suspense fallback={<li>Loading...</li>}>
        <Await resolve={slowPromise1}>
          {(data) => (
            <li>{data}</li>
          )}
        </Await>
        </Suspense>
        <Suspense fallback={<li>Loading...</li>}>
        <Await resolve={slowPromise2}>
          {(data) => (
            <li>{data}</li>
          )}
        </Await>
        </Suspense>
        <Suspense fallback={<li>Loading...</li>}>
        <Await resolve={slowPromise3}>
          {(data) => (
            <li>{data}</li>
          )}
        </Await>
        </Suspense>
      </ul>
      <div className="text-center">
        <Link to="/" className="p-2 bg-blue-300 rounded">トップページ</Link>
      </div>
    </div>
  )
}