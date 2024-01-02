import { DocumentService } from "@/services/DocumentService";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const DocumentDialog = ({
  dialogVisible,
  setDialogVisible,
  selectedDocUrl,
  selectedDoc,
  setUsers,
}) => {
  const toast = useRef(null);

  const handleVerifyDocument = async () => {
    const response = await DocumentService.verifyDocument(
      selectedDoc.document_info.document_id
    );

    if (response.status === 200) {
      setDialogVisible(false);
      toast.current.show({
        severity: "success",
        summary: "Document Verified",
        detail: `Document ${selectedDoc.document_info.document} has been verified`,
        life: 3000,
      });
      setDialogVisible(false);
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        const docIndex = newUsers.findIndex(
          (doc) =>
            doc.document_info.document_id ===
            selectedDoc.document_info.document_id
        );

        newUsers[docIndex].document_info.status = "verified";
        return newUsers;
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Document Verification Failed",
        detail: `Document ${selectedDoc.id} could not be verified`,
        life: 3000,
      });
    }
  };

  const handleUnverifyDocument = async () => {
    const response = await DocumentService.unverifyDocument(
      selectedDoc.document_info.document_id
    );

    if (response.status === 200) {
      setDialogVisible(false);
      toast.current.show({
        severity: "success",
        summary: "Document Unverified",
        detail: `Document ${selectedDoc.document_info.document} has been unverified`,
        life: 3000,
      });
      setDialogVisible(false);
      setUsers((prevUsers) => {
        const newUsers = [...prevUsers];
        const docIndex = newUsers.findIndex(
          (doc) =>
            doc.document_info.document_id ===
            selectedDoc.document_info.document_id
        );

        newUsers[docIndex].document_info.status = "unverified";
        return newUsers;
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Document Unverification Failed",
        detail: `Document ${selectedDoc.id} could not be unverified`,
        life: 3000,
      });
    }
  };

  const footerContent = () => {
    if (selectedDoc?.document_info.status === "unverified") {
      return (
        <div>
          <Button
            label="Verify Document"
            icon="pi pi-check"
            onClick={handleVerifyDocument}
            autoFocus
          />
        </div>
      );
    } else if (selectedDoc?.document_info.status === "verified") {
      return (
        <div>
          <Button
            label="Cancel Verification"
            icon="pi pi-times"
            severity="danger"
            onClick={handleUnverifyDocument}
            autoFocus
          />
        </div>
      );
    }
  };
  return (
    <Dialog
      header="Document Preview"
      maximizable
      visible={dialogVisible}
      className="w-5 h-screen"
      onHide={() => setDialogVisible(false)}
      footer={footerContent}
    >
      <Toast ref={toast} />
      <div className="flex w-full relative flex flex-column">
        {/* Check how many urls are there in selectedDocUrl, then renders the image*/}
        {selectedDocUrl &&
          selectedDocUrl.map((url, index) => (
            <>
              <Skeleton
                key={index}
                shape="rectangular"
                width="100%"
                height="200px"
                className={`mb-2 ${!url ? "block" : "hidden"}`}
              />
              <img
                key={index}
                src={url}
                alt=""
                className="w-full border-round border-solid border-1 mb-2"
                style={url ? { display: "block" } : { display: "none" }}
              />
            </>
          ))}

        {/* Cover to prevent right clicking */}
        <div className="absolute top-0 bottom-0 left-0 right-0 "></div>
      </div>
    </Dialog>
  );
};

export default DocumentDialog;
