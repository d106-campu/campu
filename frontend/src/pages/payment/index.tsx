import Header from "@/components/@common/Header/Header";
import Footer from "@/components/@common/Footer/Footer";
import PaymentContainer from "@/components/payment/PaymentContainer";

const PaymentPage = () => {
  return (
    <>
      <Header />
      <div>
        <PaymentContainer />
      </div>
      <Footer state="onePage" />
    </>
  );
};

export default PaymentPage;
