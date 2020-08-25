
import Layout, { siteTitle } from '../components/layout'

const fetch = require('node-fetch');


export default function Home({ devices }) {
  return (
    <Layout >
      {devices.map((device) => (
        <table>
          <thead>
            <th>
                {device.localname} / {device.localIP}  
            </th>
          </thead>  
          {console.log('1')}
          <tbody>
            <tr>
              <td>
                {device.IPaddress[0][3].value}
              </td>
            </tr>
            {device.IPaddress.map((port) =>{
              <tr>
                <td>
                  {console.log(port[3].value), port[3].value}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      ))}
    </Layout >
      
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000')
  const devices = await res.json()

  return {
    props: {
      devices
    }
  }
}