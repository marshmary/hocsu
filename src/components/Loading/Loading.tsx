import { Spinner } from "flowbite-react";
import * as React from "react";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
    return <Spinner color="purple" aria-label="Data in loading..." size="xl" />;
};

export default Loading;
