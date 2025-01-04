

export default async function WomensHomePage(props:{params: Promise<{products:string}>}) {
    const params = await props.params;



    return (
        <main className="min-h-screen flex flex-wrap max-w-screen justify-center items-center">
    <div className="min-h-screen flex flex-wrap justify-center items-center space-x-6 border border-stone-900 rounded-3xl ">
<h1> i am products page</h1>
<h2>hello i am {`${params.products}`}</h2>
   
   
    </div>
    </main>
    )
}