import { Await } from "react-router-dom";
import { Suspense } from "react";

import DashboardItem from "../components/deshboard/DeshboardItem";
import LoadingSpinner from "../components/Loading";

import { useRouteLoaderData } from "react-router-dom";
import api from "../utils/axios";
const DashboardScreen = () => {
  const { leads } = useRouteLoaderData("allLeads");

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={leads}>
          {(isLoadingData) => <DashboardItem leads={isLoadingData} />}
        </Await>
      </Suspense>
    </>
  );
};

export default DashboardScreen;

const leads = async () => {
  try {
    const response = await api.get(
      `/api/leads`
    );

    return response?.data?.leads;
  } catch (error) {
    throw new Response(
      JSON.stringify({
        message: error.response?.data?.message || "Failed to fetch leads.",
      }),
      { status: error.response?.status || 500 }
    );
  }
};

export const loader = async () => {
  return {
    leads: leads(),
  };
};
