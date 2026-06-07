import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import LeadManagement from "../components/leads/LeadManagement";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../utils/toast";
import { Suspense } from "react";
import Loading from "../components/Loading";
import api from "../utils/axios";

const LeadManagementPage = () => {
  const { lead } = useRouteLoaderData("leadId");
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={lead}>
          {(isLeadLoad) => (
            <LeadManagement
              lead={isLeadLoad.lead}
              comments={isLeadLoad.comments}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default LeadManagementPage;

const lead = async (leadId) => {
  try {
    const response = await api.get(
      `/api/leads/${leadId}`
    );

    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Response(
      JSON.stringify({
        message:
          error.response?.data?.message || "Failed to fetch lead details.",
      }),
      { status: error.response?.status || 500 }
    );
  }
};

export const loader = async ({ request, params }) => {
  const leadId = params.id;

  return {
    lead: lead(leadId),
  };
};

export const actions = async ({ request, params }) => {
  const formData = await request.formData();
  const leadId = params.id;
  const toastId = showLoadingToast("Adding new agent...");

  const data = {
    name: formData.get("name"),
    author: formData.get("author"),
    commentText: formData.get("commentText"),
  };

  try {
    const response = await api.post(
      `/api/leads/${leadId}/comments`,
      data
    );

    showSuccessToast(
      toastId,
      response?.data?.message || "Comment added successfully."
    );
    return redirect(`/leads/${leadId}`);
  } catch (error) {
    showErrorToast(
      leadId,
      error.response?.data?.message || "Error occurred while add comment."
    );
  }
};
