import Head from '../head/head';
import Foot from '../foot/foot';
import { Outlet } from "react-router-dom";
import './layout.css'

function Layout(){
    return(
        <div>
            <Head/>
            <main className='main'>
              <Outlet />
            </main>
            <Foot/>
        </div>
    )
}

export default Layout