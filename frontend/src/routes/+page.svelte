<script>
    import axios from 'axios';
    import moment from 'moment';
    import "$lib/css/app.css";
    import { ToastContainer, FlatToast, toasts }  from "svelte-toasts";
    import { config } from '$lib/config';
    const { apiUrl } = config;

    let url;
    let shortcode;
    let customShortcode;
    let title = 'URL shorter';
    let urlData;

    $: generate = async () => {
        if (!url) {
            toasts.add({
                title,
                description: 'Url link is required',
                type: 'warning'
            });
            return false;
        }

        try {
            const req = await axios.post(`${apiUrl}/submit`, {
                url,
                shortcode: customShortcode
            })
            url = customShortcode = '';
            urlData = req.data.data

            toasts.add({
                title,
                description: req.data.message,
                type: 'success'
            });

        }catch (e) {
            toasts.add({
                title,
                description: e.response.data.message,
                type: 'error'
            });
        }

    }

    $: analyse = async () => {
        if (!shortcode) {
            toasts.add({
                title,
                description: 'Url shortcode is required',
                type: 'warning'
            });
            return false;
        }

        try {
            const req = await axios.get(`${apiUrl}/${shortcode}/stats`)
            shortcode = '';
            urlData = req.data.data

            toasts.add({
                title: 'Analyse shortcode',
                description: req.data.message,
                type: 'success'
            });

        }catch (e) {
            toasts.add({
                title,
                description: e.response.data.message,
                type: 'error'
            });
        }

    }

</script>

<ToastContainer placement="top-right"
                theme="dark"
                duration={4000}
                let:data={data}>
    <FlatToast {data}  />
</ToastContainer>

<div class="isolate bg-white">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
            <defs>
                <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9089FC"></stop>
                    <stop offset="1" stop-color="#FF80B5"></stop>
                </linearGradient>
            </defs>
        </svg>
    </div>
    <div class="px-6 pt-6 lg:px-8">
        <div>
            <nav class="flex h-9 items-center justify-between" aria-label="Global">
                <div class="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <img class="h-8" src="/images/logo.png" alt="" style="height: 90px">
                    </a>
                </div>
                <div class="flex lg:hidden">
                    <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span class="sr-only">Open main menu</span>
                        <!-- Heroicon name: outline/bars-3 -->
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div class="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">

                </div>
                <div class="hidden lg:flex lg:flex-1 lg:justify-end">
                    <form class="min-w-full" on:submit|preventDefault={analyse}>
                        <div class="relative">
                            <input type="text" id="search" class="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-0 focus:ring-indigo-500 sm:text-sm p-4" placeholder="Input shortcode here" bind:value={shortcode} required>
                            <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Analyse</button>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    </div>
    <main>
        <div class="relative">
            <div class="mx-auto max-w-3xl pt-20">
                <div>
                    <div>
                        <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl mb-20">Paste the URL to be shortened</h1>
                        <div class="flex flex-row justify-center items-center mb-6">
                            <div class="">
                                <label class="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Custom shortcode:
                                </label>
                            </div>
                            <div class="">
                                <input class="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-0 focus:ring-indigo-500 sm:text-sm p-3" id="inline-full-name" type="text" bind:value={customShortcode}>
                            </div>
                        </div>
                        <form on:submit|preventDefault={generate}>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5 text-gray-500 dark:text-gray-400" viewBox="0 0 16 16" id="IconChangeColor" transform="rotate(45)"> <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" id="mainIconPathAttribute"></path> <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" id="mainIconPathAttribute" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> </svg>
                                </div>
                                <input type="url" class="mt-1 block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-0 focus:ring-indigo-500 sm:text-sm p-4 pl-10" placeholder="Enter link here" bind:value={url} required>
                                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Shorten URL</button>
                            </div>
                        </form>

                    </div>

                    {#if urlData}
                        <div class="w-full mt-8">
                            <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                                <div class="px-4 py-5 sm:px-6">
                                    <div class="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4 font-bold text-xl mb-2"><a href="{urlData.shortUrl}" target="_blank">{urlData.shortUrl}</a></div>
                                    <p class="text-gray-700 text-base">Long URL: {urlData.url}</p>
                                </div>
                                <div class="border-t border-gray-200">
                                    <dl>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Shortcode</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{urlData.shortcode}</dd>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Number of entry</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{urlData.entry}</dd>
                                        </div>
                                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Last entry</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{urlData.entry ? moment(urlData.updatedAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('MMMM Do YYYY, h:mm a') : 'None'}</dd>
                                        </div>
                                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt class="text-sm font-medium text-gray-500">Date created</dt>
                                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{moment(urlData.createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('MMMM Do YYYY, h:mm a')}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                        </div>
                    {/if}


                    <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                        <svg class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
                            <defs>
                                <linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#9089FC"></stop>
                                    <stop offset="1" stop-color="#FF80B5"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

