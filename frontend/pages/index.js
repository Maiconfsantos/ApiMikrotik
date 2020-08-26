
import Layout, { siteTitle } from '../components/layout'

const fetch = require('node-fetch');


export default function Home({ devices }) {
  return (
    <Layout >
      {devices.map((device) => (
          <table>  
            {console.log('1')}
            <tbody>
              <tr>
                <th>
                    {device.localname} / {device.localIP}  
                </th>
              </tr>

              <tr>
                <td>
                  Interface
                </td>
                <td>
                  Address
                </td>
                <td>
                  Network
                </td>
              </tr>  
              {device.IPaddress.map(port =>(
                <tr>
                  <td>
                    {console.log(port), port[3].value /*interface name*/} 
                  </td>
                  <td>
                    {port[1].value /*address name*/}
                  </td>
                  <td>
                    {port[2].value /*network name*/}
                  </td>

                </tr>
              ))}
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