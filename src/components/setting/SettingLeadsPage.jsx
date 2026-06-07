import { useRouteLoaderData, Await } from "react-router-dom";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../utils/toast";
import ManageLeads from "./ManageLeads";
import Loading from "../Loading";
import { Suspense } from "react";
import api from "../../utils/axios";

const SettingLeadsPage = () => {
  const { leads } = useRouteLoaderData("allLeads");

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={leads}>
        {(isLeadLoad) => <ManageLeads leads={isLeadLoad} />}
      </Await>
    </Suspense>
  );
};

export default SettingLeadsPage;

export const action = async ({ request }) => {
  const formData = await request.formData();

  const leadId = formData.get("leadId");
  const toastId = showLoadingToast("Delete lead...");

  try {
    const response = await api.delete(
      `/api/leads/${leadId}`
    );

    showSuccessToast(
      toastId,
      response?.data?.message || "Failed to delete lead."
    );
  } catch (error) {
    showErrorToast(
      toastId,
      error.response?.data?.message || "Failed to delete leads."
    );
  }
};
