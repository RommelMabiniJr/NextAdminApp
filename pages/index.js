import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductService } from "../demo/service/ProductService";
import { PaymentService } from "../demo/service/PaymentService";
import { LayoutContext } from "../layout/context/layoutcontext";
import Link from "next/link";
import axios from "axios";
import { DashboardService } from "@/services/DashboardService";

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "2022",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "#2f4860",
      borderColor: "#2f4860",
      tension: 0.4,
    },
    {
      label: "2023",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: "#00bb7e",
      borderColor: "#00bb7e",
      tension: 0.4,
    },
  ],
};

const Dashboard = () => {
  const [products, setProducts] = useState(null);
  const [unverifiedUsers, setUnverifiedUsers] = useState(null);
  const [unverfiedDocuments, setUnverifiedDocuments] = useState(null);
  const menu1 = useRef(null);
  const menu2 = useRef(null);
  const [lineOptions, setLineOptions] = useState(null);
  const { layoutConfig } = useContext(LayoutContext);
  const [userType, setUserType] = useState("all");
  const [workType, setWorkType] = useState("posting");
  const [payments, setPayments] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [months, setMonths] = useState([]);
  const [userLineData, setUserLineData] = useState(null);
  const [servicesDistribution, setServicesDistribution] = useState(null);
  const [serviceDistCount, setServiceDistCount] = useState(null);

  const onPaymentSelect = (e) => {
    setSelectedPayment(e.data);
  };

  const processUserChartData = (apiData) => {
    // Extract months from the API data and sort them in logical order
    const sortedMonths = apiData
      .map((item) => item.month)
      .sort((a, b) => {
        const monthOrder = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return monthOrder.indexOf(a) - monthOrder.indexOf(b);
      });

    // Set the sorted months to the state
    setMonths(sortedMonths);

    // Extract household employers and kasambahay workers data from the API
    const householdEmployersData = apiData
      .sort(
        (a, b) => sortedMonths.indexOf(a.month) - sortedMonths.indexOf(b.month)
      )
      .map((item) => parseInt(item.household_employers, 10));

    const kasambahayWorkersData = apiData
      .sort(
        (a, b) => sortedMonths.indexOf(a.month) - sortedMonths.indexOf(b.month)
      )
      .map((item) => parseInt(item.kasambahay_workers, 10));

    // Create the Chart.js data structure
    const lineData = {
      labels: sortedMonths,
      datasets: [
        {
          label: "Household Employer",
          data: householdEmployersData,
          fill: false,
          backgroundColor: "#4547a9",
          borderColor: "#4547a9",
          tension: 0.4,
        },
        {
          label: "Kasambahay Worker",
          data: kasambahayWorkersData,
          fill: false,
          backgroundColor: "#ec4899",
          borderColor: "#ec4899",
          tension: 0.4,
        },
      ],
    };

    // Set the Chart.js data structure to the state
    setUserLineData(lineData);
  };

  const paymentColumns = [
    { field: "paymentId", header: "Payment ID" },
    { field: "serviceType", header: "Service Type" },
    {
      field: "paymentAmount",
      header: "Payment Amount",
      body: (data) => formatCurrency(data.paymentAmount),
    },
    {
      field: "appFee",
      header: "App Fee",
      body: (data) => formatCurrency(data.appFee),
    },
  ];

  const ServiceColors = {
    "House Services": {
      backgroundColor: "bg-orange-500",
      textColor: "text-orange-500",
    },
    "Child Care": {
      backgroundColor: "bg-pink-500",
      textColor: "text-pink-500",
    },
    "Elder Care": {
      backgroundColor: "bg-purple-500",
      textColor: "text-purple-500",
    },
    "Pet Care": {
      backgroundColor: "bg-teal-500",
      textColor: "text-teal-500",
    },
  };

  // call the api to get the data for users
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserCountAndUserChartData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/all/user/counts`
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await DashboardService.getUserChartData();
        processUserChartData(response.data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    const fetchServicesDistribution = async () => {
      const result = await DashboardService.getServiceDistributionData();
      if (result.status === 200) {
        const serviceDistData = result.data;

        const totalCount = serviceDistData.reduce(
          (total, service) => total + service.service_count,
          0
        );
        setServiceDistCount(totalCount);
        setServicesDistribution(serviceDistData);
      }
    };

    fetchServicesDistribution();

    fetchUserCountAndUserChartData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/all/post/counts`
        );
        setPosts(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/all/booking/counts`
        );
        setBooking(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchPosts();
    fetchBookings();
  }, []);

  // Replace this with your own logic to retrieve user counts
  // const householdCount = 10000;
  // const newHouseholdCount = 233;
  // const workerCount = 15000;
  // const newWorkerCount = 45;
  // const totalCount = householdCount + workerCount;

  const householdCount = users
    ? users.find((user) => user.user_type === "household employer")?.count || 0
    : 0;
  const newHouseholdCount = 1;
  const workerCount = users
    ? users.find((user) => user.user_type === "domestic worker")?.count || 0
    : 0;
  const newWorkerCount = 0;
  const totalCount = householdCount + workerCount;

  // Replace this with your own logic to retrieve posting & booking counts
  const fullTimeCount = posts
    ? posts.find((post) => post.job_type === "full-time")?.count || 0
    : 0;
  const partTimeCount = posts
    ? posts.find((post) => post.job_type === "part-time")?.count || 0
    : 0;
  const temporaryCount = posts
    ? posts.find((post) => post.job_type === "temporary")?.count || 0
    : 0;

  const postingCount = fullTimeCount + partTimeCount + temporaryCount;
  //   booking is displayed for example in rows:
  //   booking_type totalBookings
  //   Booking	3
  //   Direct Hire Booking	2

  // Combine all booking types into one count
  const bookingCount = booking?.reduce((accumulator, currentValue) => {
    accumulator += currentValue.totalBookings;
    return accumulator;
  }, 0);
  const newPostingCount = 37;
  const newBookingCount = 11;

  // Define variables for displaying user counts
  let count, newCount, label;
  if (userType === "all") {
    count = totalCount;
    label = "Total Users";
    newCount = newHouseholdCount + newWorkerCount;
  } else if (userType === "household") {
    count = householdCount;
    label = "Household Employers";
    newCount = newHouseholdCount;
  } else if (userType === "worker") {
    count = workerCount;
    label = "Domestic Workers";
    newCount = newWorkerCount;
  }

  // Define variables for displaying user counts
  let workCount, newWorkCount, workLabel;
  if (workType === "posting") {
    workCount = postingCount;
    workLabel = "Job Postings";
    newWorkCount = newPostingCount;
  } else if (workType === "booking") {
    workCount = bookingCount;
    workLabel = "Bookings";
    newWorkCount = newBookingCount;
  }

  const applyLightTheme = () => {
    const lineOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  const applyDarkTheme = () => {
    const lineOptions = {
      plugins: {
        legend: {
          labels: {
            color: "#ebedef",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
        y: {
          ticks: {
            color: "#ebedef",
          },
          grid: {
            color: "rgba(160, 167, 181, .3)",
          },
        },
      },
    };

    setLineOptions(lineOptions);
  };

  useEffect(() => {
    PaymentService.getPaymentsSmall().then((data) => setPayments(data));

    const fetchUnverifiedUsersAndDocs = async () => {
      const result = await DashboardService.getUnverifiedUserCounts();

      if (result.status === 200) {
        setUnverifiedUsers(result.data);
      }

      const result2 = await DashboardService.getUnverifiedDocumentCounts();

      if (result2.status === 200) {
        setUnverifiedDocuments(result2.data);
      }
    };

    fetchUnverifiedUsersAndDocs();
  }, []);

  useEffect(() => {
    if (layoutConfig.colorScheme === "light") {
      applyLightTheme();
    } else {
      applyDarkTheme();
    }
  }, [layoutConfig.colorScheme]);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleUserTypeChange = (newUserType) => {
    setUserType(newUserType);
  };

  const handleWorkTypeChange = (newWorkType) => {
    setWorkType(newWorkType);
  };

  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                {workLabel}
              </span>
              <div className="text-900 font-medium text-xl">{workCount}</div>
            </div>
            <Button
              className="align-self-start"
              icon="pi pi-sort-alt"
              onClick={() =>
                handleWorkTypeChange(
                  workType === "posting" ? "booking" : "posting"
                )
              }
              rounded
              text
              aria-label="Filter"
            />
          </div>
          <span className="text-green-500 font-medium">
            {newWorkCount} new{" "}
          </span>
          <span className="text-500">since last visit</span>
        </div>
      </div>

      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">{label}</span>
              <div className="text-900 font-medium text-xl">{count}</div>
            </div>
            <Button
              className="align-self-start"
              icon="pi pi-sort-alt"
              onClick={() =>
                handleUserTypeChange(
                  userType === "all"
                    ? "household"
                    : userType === "household"
                    ? "worker"
                    : "all"
                )
              }
              rounded
              text
              aria-label="Filter"
            />
          </div>
          <span className="text-green-500 font-medium">{newCount} </span>
          <span className="text-500">newly registered</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Document Validation
              </span>
              <div className="text-900 font-medium text-xl">
                {unverfiedDocuments?.unverifiedCount} Unverified
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-orange-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-folder-open text-orange-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {unverfiedDocuments?.verifiedThisWeek}{" "}
          </span>
          <span className="text-500">verified this week</span>
        </div>
      </div>
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Account Validation
              </span>
              <div className="text-900 font-medium text-xl">
                {unverifiedUsers?.unverifiedCount} Unverified
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center bg-purple-100 border-round"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <i className="pi pi-id-card text-purple-500 text-xl" />
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {unverifiedUsers?.verifiedThisWeek}{" "}
          </span>
          <span className="text-500">verified this week</span>
        </div>
      </div>

      <div className="col-12 xl:col-6">
        <div className="card">
          <h5>Recent Payments/Sales</h5>
          <DataTable
            value={payments}
            selection={selectedPayment}
            onSelectionChange={onPaymentSelect}
            rows={5}
            paginator
            responsiveLayout="scroll"
          >
            {paymentColumns.map((column) => (
              <Column
                key={column.field}
                field={column.field}
                header={column.header}
                sortable={true}
                style={{ width: "25%" }}
                body={column.body}
              />
            ))}
            <Column
              header="View"
              style={{ width: "15%" }}
              body={() => (
                <>
                  <Button icon="pi pi-search" type="button" text />
                </>
              )}
            />
          </DataTable>
        </div>
        <div className="card">
          <div className="flex justify-content-between align-items-center mb-5">
            <h5>Services Popularity Distribution</h5>
            <div>
              <Button
                type="button"
                icon="pi pi-ellipsis-v"
                className="p-button-rounded p-button-text p-button-plain"
                onClick={(event) => menu1.current.toggle(event)}
              />
              <Menu
                ref={menu1}
                popup
                model={[
                  { label: "Add New", icon: "pi pi-fw pi-plus" },
                  { label: "Remove", icon: "pi pi-fw pi-minus" },
                ]}
              />
            </div>
          </div>
          <ul className="list-none p-0 m-0">
            {servicesDistribution?.map((service) => (
              <li
                key={service.service_name}
                className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
              >
                <div>
                  {console.log(ServiceColors[service.service_name])}
                  <span
                    className={`text-900 font-medium mr-2 mb-1 md:mb-0 ${
                      ServiceColors[service.service_name]?.textColor
                    }`}
                  >
                    {service.service_name}
                  </span>
                  <div className="mt-1 text-600">Location</div>
                </div>
                <div className="mt-2 md:mt-0 flex align-items-center">
                  <div
                    className={`surface-300 border-round overflow-hidden w-10rem lg:w-6rem `}
                    style={{ height: "8px" }}
                  >
                    <div
                      className={`h-full ${
                        ServiceColors[service.service_name]?.backgroundColor
                      }`}
                      style={{
                        width: `${
                          (service.service_count / serviceDistCount) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <span
                    className={`${
                      ServiceColors[service.service_name]?.textColor
                    } ml-3 font-medium`}
                  >{`%${(
                    (service.service_count / serviceDistCount) *
                    100
                  ).toFixed(2)}`}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="col-12 xl:col-6">
        <div className="card">
          {/* Get current year */}
          <h5>Users Overview ({new Date().getFullYear()})</h5>
          <Chart type="line" data={userLineData} options={lineOptions} />
        </div>

        <div className="card">
          <div className="flex align-items-center justify-content-between mb-4">
            <h5>Notifications</h5>
            <div>
              <Button
                type="button"
                icon="pi pi-ellipsis-v"
                className="p-button-rounded p-button-text p-button-plain"
                onClick={(event) => menu2.current.toggle(event)}
              />
              <Menu
                ref={menu2}
                popup
                model={[
                  { label: "Add New", icon: "pi pi-fw pi-plus" },
                  { label: "Remove", icon: "pi pi-fw pi-minus" },
                ]}
              />
            </div>
          </div>

          <span className="block text-600 font-medium mb-3">TODAY</span>
          <ul className="p-0 mx-0 mt-0 mb-4 list-none">
            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
              <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-yellow-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-exclamation-triangle text-xl text-yellow-500" />
              </div>
              <span className="text-900 line-height-3">
                Maria Santos
                <span className="text-700">
                  {" "}
                  has reported a serious issue with a domestic worker or job.
                </span>
              </span>
            </li>
            <li className="flex align-items-center py-2">
              <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-users text-xl text-orange-500" />
              </div>
              <span className="text-700 line-height-3">
                A large number of clients or domestic workers have signed up for
                the app within a short period of time.
              </span>
            </li>
          </ul>

          <span className="block text-600 font-medium mb-3">YESTERDAY</span>
          <ul className="p-0 m-0 list-none">
            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
              <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-exclamation-circle text-xl text-blue-500" />
              </div>
              <span className="text-900 line-height-3">
                <span className="text-700">
                  {" "}
                  A major update or feature has been added to the app.
                </span>
              </span>
            </li>
            <li className="flex align-items-center py-2 border-bottom-1 surface-border">
              <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                <i className="pi pi-ticket text-xl text-pink-500" />
              </div>
              <span className="text-900 line-height-3">
                Juan Dela Cruz
                <span className="text-700">
                  {" "}
                  has submitted a support ticket about a refund request.
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
