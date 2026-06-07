import axios from "axios";
import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import EditLeadForm from "../components/leads/EditLeadForm";
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../utils/toast";
import { Suspense } from "react";
import Loading from "../components/Loading";

const EditLeadPage = () => {
  const { lead } = useRouteLoaderData("leadId");

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={lead}>
          {(isLoadLeadInfo) => <EditLeadForm lead={isLoadLeadInfo.lead} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EditLeadPage;

export const action = async ({ request, params }) => {
  const leadId = params.id;
  const formData = await request.formData();
  const toastId = showLoadingToast("Update lead...");

  const data = {
    name: formData.get("name"),
    source: formData.get("source"),
    closedAt: formData.get("closedAt"),
    status: formData.get("status"),
    salesAgent: formData.get("salesAgent"),
    timeToClose: Number(formData.get("timeToClose")),
    priority: formData.get("priority"),
    tags: formData.getAll("tags"), // ✅ multiple checkbox
  };

  try {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/leads/${leadId}`,
      data
    );

    showSuccessToast(toastId, "Lead  update successfully.");
    return redirect(`/leads/${leadId}`);
  } catch (error) {
    showErrorToast(
      toastId,
      error.response?.data?.message || "Error occurred while update lead ❌"
    );
  }
};
