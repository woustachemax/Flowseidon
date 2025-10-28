import AppHeader from "@/custom-components/app-header"

const Layout = ({children}: {children: React.ReactNode})=>{
    return(
        <> 
        <AppHeader/>
        <main className="flex-1"> 
            {children}
        </main>
        </>
           
         
    )

}


export default Layout