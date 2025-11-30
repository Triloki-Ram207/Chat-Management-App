import React, { useState, useEffect } from "react";
import TeamRow from "../components/Team/TeamRow.jsx";
import AddMemberButton from "../components/Team/AddMemberBtn.jsx";
import "../cssFiles/Team/Team.css";
import AddMemberModal from "../components/Team/AddMemberModal.jsx";
import DeleteModal from "../components/ContactCenter/ChatReassignedModal.jsx";
import { getAllMembers } from "../api/member.js";
import toast from "react-hot-toast";
import { deleteMember } from "../api/member.js";
import { useSelector } from "react-redux";

function Team() {
  const [memberModal, setMemberModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState(null);

  const currentMember = useSelector((state) => state.member.member);

  const fetchMembers = async () => {
    try {
      const response = await getAllMembers();
      console.log(response.data);
      setTeamMembers(response.data);
      toast.success("Team members loaded");
    } catch (error) {
      console.error("Failed to fetch team members:", error);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async () => {
    if (!memberId) {
      toast.error("No member selected for deletion");
      return;
    }
    if (currentMember?.role !== "admin") {
      toast.error("Only admin can delete members");
      return;
    }

    if (currentMember?.id === memberId) {
      toast.error("Admin cannot delete their own account");
      return;
    }

    try {
      await deleteMember(memberId);
      toast.success("Member deleted successfully");
    } catch (error) {
      console.error("Failed to delete member:", error);
      toast.error("Failed to delete member. Please try again.");
    } finally {
      setMemberId(null);
      fetchMembers();
    }
  };

  return (
    <div className="team-page">
      <h2>Team</h2>

      <div className="team-table-container">
        {loading ? (
          <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading team members...</p>
         </div>
        ) : (
          <table className="team-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <TeamRow
                  key={index}
                  member={member}
                  setDeleteModal={setDeleteModal}
                  setMemberId={setMemberId}
                />
              ))}
            </tbody>
          </table>
        )}

        <AddMemberButton
          onClick={() => {
            if (currentMember?.role === "admin") {
              setMemberModal(true);
            } else {
              toast.error("Only admin can add members");
            }
          }}
        />
      </div>

      {memberModal && (
        <AddMemberModal
          onClose={() => setMemberModal(false)}
          onSave={(data) => console.log("New member data:", data)}
        />
      )}

      <div className="delete-modal-container">
        {deleteModal.open && (
          <div
            className="delete-modal-container"
            style={{
              position: "fixed",
              top: deleteModal.position.top,
              left: deleteModal.position.left,
              zIndex: 9999,
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              borderRadius: "8px",
            }}
          >
            <DeleteModal
              title="Delete Member"
              message="Are you sure you want to delete this member? This action cannot be undone."
              isOpen={deleteModal.open}
              onConfirm={() => {
                handleDelete();
                setDeleteModal({ open: false, position: { top: 0, left: 0 } });
              }}
              onCancel={() =>
                setDeleteModal({ open: false, position: { top: 0, left: 0 } })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Team;
