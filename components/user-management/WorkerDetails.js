import React, { useRef } from "react";
import { classNames } from "primereact/utils";
import { buildAddressString } from "@/utils/addressUtils";
import dayjs from "dayjs";
import { Toast } from "primereact/toast";
import { Chip } from "primereact/chip";
import { UserService } from "@/services/UserService";

const WorkerDetails = ({ workerDetails, refetchUsers }) => {
  const toast = useRef(null);

  const handleVerifyAndUnverify = async () => {
    const result = await UserService.setAccountVerification(
      workerDetails.user_info.user_id,
      workerDetails.user_info.verified == 0 ? 1 : 0
    );

    if (result.status === 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `Account successfully ${
          workerDetails.user_info.verified == 0 ? "verified" : "unverified"
        }`,
        life: 3000,
      });

      // modify workerDetails that was passed as prop
      workerDetails.user_info.verified =
        workerDetails.user_info.verified == 0 ? 1 : 0;

      await refetchUsers();
    } else if (result.status === 500) {
      showServerError(result.data);
    }
  };
  return (
    <div className="p-4 ">
      <Toast ref={toast} />
      <div className="flex gap-4">
        <img
          src={
            process.env.NEXT_PUBLIC_ASSET_URL +
            workerDetails.user_info.profile_url
          }
          alt="profile"
          className="h-4rem w-4rem border-circle"
        />
        <div>
          <div className="font-medium text-3xl text-900 ">
            {workerDetails.user_info.first_name +
              " " +
              workerDetails.user_info.last_name}
          </div>
          <div className="text-500 mb-5">
            Egestas sed tempus urna et pharetra pharetra massa massa ultricies.
          </div>
        </div>
      </div>

      <div className="grid grid-nogutter border-top-1 surface-border pt-2">
        <div className="col-12 md:col-6 p-3">
          <div className="text-500 font-medium mb-2">Phone</div>
          <div className="text-900">{workerDetails.user_info.phone}</div>
        </div>
        <div className="col-12 md:col-6 p-3">
          <div className="text-500 font-medium mb-2">Email</div>
          <div className="text-900">{workerDetails.user_info.email}</div>
        </div>
        <div className="col-12 md:col-6 p-3">
          <div className="text-500 font-medium mb-2">Address</div>
          <div className="text-900">
            {" "}
            {buildAddressString(
              workerDetails.user_info.street,
              workerDetails.user_info.barangay,
              workerDetails.user_info.city_municipality
            )}
          </div>
        </div>
        <div className="col-12 md:col-6 p-3">
          <div className="text-500 font-medium mb-2">Account Created</div>
          <div className="text-900">
            {" "}
            {/* 2023-05-01 08:15:00 */}
            {/* Use dayjs */}
            {dayjs(workerDetails.user_info.created_at).format(
              "MMMM DD, YYYY hh:mm A"
            )}
          </div>
        </div>
        <div className="col-12 p-3">
          <div className="text-500 font-medium mb-2">Bio</div>
          <div className="text-900 line-height-3">
            {workerDetails.additional_info.bio}
          </div>
        </div>
        <div className="col-12 p-3 border-top-1 surface-border py-3">
          <div className="text-500 font-medium mb-2">Account Satus</div>
          <div className="flex md:align-items-center md:justify-content-between flex-column md:flex-row ">
            <div className="flex align-items-center">
              <Chip
                label={
                  workerDetails.user_info.verified == 1
                    ? "VERIFIED"
                    : "UNVERIFIED"
                }
                icon={`pi ${
                  workerDetails.user_info.verified == 1
                    ? "pi-check-circle"
                    : "pi-times-circle"
                }`}
                className={classNames("mr-2 text-white font-semibold", {
                  "bg-green-500": workerDetails.user_info.verified == 1,
                  "bg-yellow-500": workerDetails.user_info.verified == 0,
                })}
              />
            </div>
            <button
              aria-label="VerifyAndUnverify"
              className={`p-button p-button-raised p-component mt-2 md:mt-0 ${
                workerDetails.user_info.verified == 1
                  ? "p-button-danger"
                  : "p-button-success"
              }`}
              onClick={() => handleVerifyAndUnverify()}
            >
              {/* <span
                className={classNames(
                  "p-button-icon p-c p-button-icon-left pi",
                  {
                    "pi-check-circle": workerDetails.user_info.verified == 0,
                    "pi-times-circle": workerDetails.user_info.verified == 1,
                  }
                )}
              /> */}
              <span className="p-button-label p-c">
                {workerDetails.user_info.verified == 0 ? "Verify" : "Unverify"}
              </span>

              <span
                role="presentation"
                className="p-ink"
                style={{ height: "142.042px", width: "142.042px" }}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
