import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import DashboardView from "./components/DashboardView";
import DocumentsView from "./components/DocumentsView";
import ProfileView from "./components/ProfileView";
import AuthModal from "./components/AuthModal";
import DocumentModal from "./components/DocumentModal";
import DocumentDetailModal from "./components/DocumentDetailModal";
import PublicIdentityModal from "./components/PublicIdentityModal";
import ConfirmModal from "./components/ConfirmModal";
import Toast from "./components/Toast";
import { initialUserProfile, initialDocuments } from "./data/initialData";

function App() {
  // Persistence state
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem("memoryverse_documents");
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("memoryverse_user");
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("memoryverse_isLoggedIn");
    return saved ? JSON.parse(saved) : false;
  });

  // Navigation state
  const [activeTab, setActiveTab] = useState(() => (isLoggedIn ? "dashboard" : "landing"));

  // Modals state
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: "login" });
  const [documentModal, setDocumentModal] = useState({ isOpen: false, docToEdit: null });
  const [detailModal, setDetailModal] = useState({ isOpen: false, doc: null });
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, docId: null });
  const [publicProfileModal, setPublicProfileModal] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // LocalStorage Synchronization
  useEffect(() => {
    localStorage.setItem("memoryverse_documents", JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem("memoryverse_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("memoryverse_isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // Toast trigger helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Auth operations
  const handleAuthSuccess = (userData, message) => {
    setUser((prev) => ({ ...prev, ...userData }));
    setIsLoggedIn(true);
    setActiveTab("dashboard");
    showToast(message || "Successfully authenticated!", "success");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("landing");
    showToast("Logged out of MemoryVerse-AI vault", "info");
  };

  // Document Operations
  const handleSaveDocument = (docObj, message) => {
    setDocuments((prevDocs) => {
      const exists = prevDocs.some((d) => d.id === docObj.id);
      if (exists) {
        return prevDocs.map((d) => (d.id === docObj.id ? docObj : d));
      } else {
        return [docObj, ...prevDocs];
      }
    });
    showToast(message || "Document saved to vault!", "success");
  };

  const handleDeleteDocument = (docId) => {
    setDocuments((prevDocs) => prevDocs.filter((d) => d.id !== docId));
    showToast("Document removed from vault", "info");
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUser((prev) => ({ ...prev, ...updatedProfile }));
    showToast("Profile settings updated", "success");
  };

  // Quick category navigation handler
  const renderTabContent = () => {
    if (!isLoggedIn && activeTab !== "landing") {
      return (
        <LandingPage
          onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
          onExploreDemo={() => {
            setIsLoggedIn(true);
            setActiveTab("dashboard");
            showToast("Entered interactive demo mode!", "info");
          }}
        />
      );
    }

    switch (activeTab) {
      case "landing":
        return (
          <LandingPage
            onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
            onExploreDemo={() => {
              setIsLoggedIn(true);
              setActiveTab("dashboard");
              showToast("Entered interactive demo mode!", "info");
            }}
          />
        );

      case "dashboard":
        return (
          <DashboardView
            user={user}
            documents={documents}
            onOpenUpload={() => setDocumentModal({ isOpen: true, docToEdit: null })}
            setActiveTab={setActiveTab}
            onPreviewDoc={(doc) => setDetailModal({ isOpen: true, doc })}
            onEditDoc={(doc) => setDocumentModal({ isOpen: true, docToEdit: doc })}
            onDeleteDoc={(docId) => setConfirmModal({ isOpen: true, docId })}
            onOpenPublicProfile={() => setPublicProfileModal(true)}
          />
        );

      case "documents":
        return (
          <DocumentsView
            documents={documents}
            initialCategoryFilter="All"
            onOpenUpload={() => setDocumentModal({ isOpen: true, docToEdit: null })}
            onPreviewDoc={(doc) => setDetailModal({ isOpen: true, doc })}
            onEditDoc={(doc) => setDocumentModal({ isOpen: true, docToEdit: doc })}
            onDeleteDoc={(docId) => setConfirmModal({ isOpen: true, docId })}
          />
        );

      case "resumes":
        return (
          <DocumentsView
            documents={documents}
            initialCategoryFilter="Resume"
            onOpenUpload={() => setDocumentModal({ isOpen: true, docToEdit: null })}
            onPreviewDoc={(doc) => setDetailModal({ isOpen: true, doc })}
            onEditDoc={(doc) => setDocumentModal({ isOpen: true, docToEdit: doc })}
            onDeleteDoc={(docId) => setConfirmModal({ isOpen: true, docId })}
          />
        );

      case "credentials":
        return (
          <DocumentsView
            documents={documents}
            initialCategoryFilter="Certificate"
            onOpenUpload={() => setDocumentModal({ isOpen: true, docToEdit: null })}
            onPreviewDoc={(doc) => setDetailModal({ isOpen: true, doc })}
            onEditDoc={(doc) => setDocumentModal({ isOpen: true, docToEdit: doc })}
            onDeleteDoc={(docId) => setConfirmModal({ isOpen: true, docId })}
          />
        );

      case "projects":
        return (
          <DocumentsView
            documents={documents}
            initialCategoryFilter="Project"
            onOpenUpload={() => setDocumentModal({ isOpen: true, docToEdit: null })}
            onPreviewDoc={(doc) => setDetailModal({ isOpen: true, doc })}
            onEditDoc={(doc) => setDocumentModal({ isOpen: true, docToEdit: doc })}
            onDeleteDoc={(docId) => setConfirmModal({ isOpen: true, docId })}
          />
        );

      case "academic":
        return (
          <DocumentsView
            documents={documents}
            initialCategoryFilter="Academic"
            onOpenUpload={() => setDocumentModal({ isOpen: true, docToEdit: null })}
            onPreviewDoc={(doc) => setDetailModal({ isOpen: true, doc })}
            onEditDoc={(doc) => setDocumentModal({ isOpen: true, docToEdit: doc })}
            onDeleteDoc={(docId) => setConfirmModal({ isOpen: true, docId })}
          />
        );

      case "profile":
        return (
          <ProfileView
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onOpenPublicProfile={() => setPublicProfileModal(true)}
            onShowToast={showToast}
          />
        );

      default:
        return (
          <DashboardView
            user={user}
            documents={documents}
            onOpenUpload={() => setDocumentModal({ isOpen: true, docToEdit: null })}
            setActiveTab={setActiveTab}
            onPreviewDoc={(doc) => setDetailModal({ isOpen: true, doc })}
            onEditDoc={(doc) => setDocumentModal({ isOpen: true, docToEdit: doc })}
            onDeleteDoc={(docId) => setConfirmModal({ isOpen: true, docId })}
            onOpenPublicProfile={() => setPublicProfileModal(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main Top Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onLogout={handleLogout}
        onOpenUpload={() => setDocumentModal({ isOpen: true, docToEdit: null })}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPublicProfile={() => setPublicProfileModal(true)}
      />

      {/* View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {renderTabContent()}
      </main>

      {/* Auth Dialog */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: "login" })}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Document Create / Edit Dialog */}
      <DocumentModal
        isOpen={documentModal.isOpen}
        docToEdit={documentModal.docToEdit}
        onClose={() => setDocumentModal({ isOpen: false, docToEdit: null })}
        onSave={handleSaveDocument}
      />

      {/* Document Detail Preview Dialog */}
      <DocumentDetailModal
        doc={detailModal.doc}
        isOpen={detailModal.isOpen}
        onClose={() => setDetailModal({ isOpen: false, doc: null })}
        onEdit={(doc) => setDocumentModal({ isOpen: true, docToEdit: doc })}
        onDelete={(docId) => setConfirmModal({ isOpen: true, docId })}
        onShowToast={showToast}
      />

      {/* Public Digital Identity Dialog */}
      <PublicIdentityModal
        isOpen={publicProfileModal}
        user={user}
        documents={documents}
        onClose={() => setPublicProfileModal(false)}
        onShowToast={showToast}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Document Record?"
        message="Are you sure you want to delete this document from your identity vault? This action cannot be undone."
        confirmText="Delete Record"
        onConfirm={() => handleDeleteDocument(confirmModal.docId)}
        onClose={() => setConfirmModal({ isOpen: false, docId: null })}
      />

    </div>
  );
}

export default App;