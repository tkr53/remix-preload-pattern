import { defer, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
 
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = ({request}: LoaderFunctionArgs) => {
  const ua = request.headers.get("User-Agent");
  const slowPromise: Promise<{data: string}> = new Promise((resolve) => {
    setTimeout(() => {
      resolve({data: "Promise Done!!"});
    }, 3000);
  });

  return defer({
    ua,
    slowPromise
  })
}

export default function Index() {
  const { ua, slowPromise } = useLoaderData<typeof loader>()
  return (
    <>
      <div className="text-center text-3xl my-4">メインコンテンツ</div>
      <div className="text-center py-10">
      <div>あなたの端末情報: {ua}
      </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={slowPromise}>
            {(data) => <div>{data.data}</div>}
          </Await>
        </Suspense>
      </div>
      <div className="text-center"><Link to="/info" className="p-2 bg-blue-300 rounded">Infoページ</Link></div>
    </>
  );
}
