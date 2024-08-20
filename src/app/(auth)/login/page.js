import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <section className="h-screen bg-neutral-200 dark:bg-neutral-700 bg-center" style={{ backgroundImage: "url(/img/zomer-2016.jpg)" }}>
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        {/* <!--Logo--> */}
                                        <div className="text-center">
                                            <img className="mx-auto w-48" src="/img/logo.png" alt="logo" />
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">The Bepper Balance Method</h4>
                                        </div>

                                        <form>
                                            <p className="mb-4">Please login to your account</p>

                                            <input type="text" placeholder="Username" className="peer block min-h-[auto] w-full bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none` disabled:bg-neutral-100 read-only:bg-neutral-100 dark:disabled:bg-neutral-700 dark:read-only:bg-neutral-700 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary px-3 py-[0.32rem] leading-[1.6] text-neutral-800 dark:text-neutral-200 mb-4 border" ></input>
                                            <input type="password" placeholder="Password" className="peer block min-h-[auto] w-full bg-transparent outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary motion-reduce:transition-none` disabled:bg-neutral-100 read-only:bg-neutral-100 dark:disabled:bg-neutral-700 dark:read-only:bg-neutral-700 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary px-3 py-[0.32rem] leading-[1.6] text-neutral-800 dark:text-neutral-200 mb-4 border" ></input>


                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <div rippleColor="light" className="w-full">
                                                    <button
                                                        className="tracking-wide font-semibold bg-lime-600 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                                        type="button"
                                                    >
                                                        Log in
                                                    </button>
                                                </div>

                                                <Link href="forgot-password">Forgot password?</Link>
                                            </div>

                                            <div className="flex items-center justify-between pb-6">
                                                <p className="mb-0 mr-2">Don't have an account?</p>
                                                <div rippleColor="light">
                                                    <Link
                                                        href="register"
                                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                    >
                                                        Register
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>


                                <div className="none lg:!flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-cover bg-bottom p-4" style={{ backgroundImage: 'url(/img/bg-img.jpg)' }}>
                                    <img
                                        src="/img/Bepper_Bord_Hout_3_zakjes.png"
                                        className="w-full"
                                        alt="Phone image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page