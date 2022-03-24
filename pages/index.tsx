import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Google</title>
        <meta name="description" content="Google clone by QL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className='flex'>
        header
      </header>

      {/* Body */}
      <form className='flex flex-grow'>
        Body
      </form>

      {/* <footer>
        Footer
      </footer> */}
    </div>
  )
}

export default Home
