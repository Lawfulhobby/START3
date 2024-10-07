import { Gradient } from "@/components/gradient";
import { Logo } from "@/components/logo";

export default function Example() {
    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
            <main className=" min-h-full">
                <Gradient/>
                <div className="flex items-center pt-20 justify-center h-full w-full">
                    <Logo />
                </div>

                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="absolute inset-0 -z-10  h-full w-full object-cover object-top"
                />
                <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                    <p className="text-base font-semibold leading-8 text-black">404</p>
                    <h1 className="mt-4 text-3xl pretty-text  font-bold tracking-tight text-black sm:text-5xl">Page not found</h1>
                    <p className="mt-4 text-base text-black/70 sm:mt-6">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="mt-10 flex justify-center">
                        <a href="/" className="text-sm font-semibold leading-7 text-black">
                            <span aria-hidden="true">&larr;</span> Back to home
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}
