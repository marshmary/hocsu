import GuideLayout from "~/components/Guide/GuideLayout";
import PageLoadAnimation from "~/components/Loading/PageLoadAnimation";

const Guide = () => {
    return (
        <PageLoadAnimation>
            <GuideLayout />
        </PageLoadAnimation>
    );
};

export default Guide;
