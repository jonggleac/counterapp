import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const myAddress = useAddress()
  const contractAddress = '0xD99bed901e17d80eB75a2014454A1d821C939052'
  const { contract, isLoading } = useContract(contractAddress)
  const [counter, setCounter] = useState<string | undefined>(undefined)

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
  }

  useEffect(() => {
    getCounter()
  })

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>
        <div className={styles.title}>
          <h3>이종엽의 카운터 앱</h3>
        </div>
        <div className={styles.description}>
          Contract Address : {contractAddress} <br />
          Host Address : 0xa48a95e3fe04E9ad7295124bCd35eb24eDBbcbfD
          <br />
          Your Address : {myAddress}
        </div>

        <div className={styles.title}>contract</div>

        <p>My Address : {myAddress}</p>
        <h1>Counter Dapp</h1>
        <h3>{counter}</h3>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => contract?.call('decrementCounter')}
            >
              <h1>-</h1>
            </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              <h1>Refresh Counter</h1>
            </Web3Button>
            <br />
          </div>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call('incrementCounter')}
            >
              <h1>+</h1>
            </Web3Button>
          </div>
          <br />
        </div>
      </main>
    </div>
  )
}

export default Home
