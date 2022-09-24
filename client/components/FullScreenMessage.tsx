import CenterLayout from "./CenterLayout";

const FullScreenMessage = ({ message }: { message: string }) => (
  <CenterLayout>
    <h3 className="mb-1 text-lg font-semibold text-center text-gray-700">
      {message}
    </h3>
  </CenterLayout>
);

export default FullScreenMessage;
