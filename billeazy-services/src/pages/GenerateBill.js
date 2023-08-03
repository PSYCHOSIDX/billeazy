import Footer from "../components/Footer";
import MeterReading from "../components/GenerateBillPage/MeterReading";
import NavbarAdminLogout from "../components/NavbarAdminLogout";

const GenerateBill = () =>{
return(
    <>
    <NavbarAdminLogout/>
    <MeterReading/>
    <Footer/>
    </>
)
}
export default GenerateBill;