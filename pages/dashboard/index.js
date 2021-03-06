import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Moralis from 'moralis'
import { useMoralis } from 'react-moralis'

function Dashboard() {
  const { isAuthenticated, logout, account } = useMoralis()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/')
  }, [isAuthenticated, router])

  const sendEth = async () => {
    try {
      await Moralis.enableWeb3()
      const result = await Moralis.transfer({
        type: 'native',
        amount: Moralis.Units.ETH('0.1'),
        receiver: account,
      })
      console.log(result)
      alert('Transfer of funds succeeded!')
    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Head>
        <title>Moralis Tutorial - Dashboard</title>
      </Head>
      <button
        onClick={sendEth}
        className="px-7 mb-5 py-4 text-xl rounded-xl bg-yellow-300"
      >
        Send 0.1 ETH to owner
      </button>
      <button
        onClick={logout}
        className="px-7 py-4 text-xl rounded-xl bg-yellow-300"
      >
        Logout
      </button>
    </div>
  )
}
export default Dashboard
