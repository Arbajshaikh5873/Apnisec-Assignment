// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// interface User {
//   name: string;
//   email: string;
//   company?: string;
// }

// interface Issue {
//   _id: string;
//   type: string;
//   title: string;
//   description: string;
//   priority: string;
//   status: string;
//   createdAt: string;
// }

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [issues, setIssues] = useState<Issue[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [filter, setFilter] = useState<string>("all");
//   const [formData, setFormData] = useState({
//     type: "cloud-security",
//     title: "",
//     description: "",
//     priority: "medium",
//   });

//   useEffect(() => {
//     fetchIssues();
//   }, [filter]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }

//     fetchIssues();
//   }, []);

//   const fetchIssues = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const url =
//         filter !== "all" ? `/api/issues?type=${filter}` : "/api/issues";

//       const response = await fetch(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       if (data.success) {
//         setIssues(data.data.issues);
//       }
//     } catch (error) {
//       console.error("Failed to fetch issues:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateIssue = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("/api/issues", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setShowCreateModal(false);
//         setFormData({
//           type: "cloud-security",
//           title: "",
//           description: "",
//           priority: "medium",
//         });
//         fetchIssues();
//       }
//     } catch (error) {
//       console.error("Failed to create issue:", error);
//     }
//   };

//   const handleDeleteIssue = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this issue?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`/api/issues/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.ok) {
//         fetchIssues();
//       }
//     } catch (error) {
//       console.error("Failed to delete issue:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   const getIssueTypeLabel = (type: string) => {
//     const labels: { [key: string]: string } = {
//       "cloud-security": "Cloud Security",
//       "reteam-assessment": "Reteam Assessment",

//       vapt: "VAPT",
//     };
//     return labels[type] || type;
//   };

//   const getIssueTypeColor = (type: string) => {
//     const colors: { [key: string]: string } = {
//       "cloud-security": "bg-blue-500/20 text-blue-300 border-blue-500/50",
//       "reteam-assessment":
//         "bg-purple-500/20 text-purple-300 border-purple-500/50",
//       vapt: "bg-orange-500/20 text-orange-300 border-orange-500/50",
//     };
//     return colors[type] || "bg-gray-500/20 text-gray-300 border-gray-500/50";
//   };

//   const getPriorityColor = (priority: string) => {
//     const colors: { [key: string]: string } = {
//       low: "bg-green-500/20 text-green-300",
//       medium: "bg-yellow-500/20 text-yellow-300",
//       high: "bg-red-500/20 text-red-300",
//       critical: "bg-red-700/20 text-red-400",
//     };
//     return colors[priority] || "bg-gray-500/20 text-gray-300";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       {/* Header */}
//       <nav className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">🛡️</span>
//               </div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
//                 ApniSec
//               </span>
//             </div>

//             <div className="flex items-center space-x-4">
//               <Link
//                 href="/profile"
//                 className="text-gray-300 hover:text-white transition"
//               >
//                 Profile
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Welcome Section */}
//         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
//           <h1 className="text-3xl font-bold text-white mb-2">
//             Welcome back, {user?.name}! 👋
//           </h1>
//           <p className="text-gray-300">{user?.email}</p>
//           {user?.company && (
//             <p className="text-gray-400 mt-1">Company: {user.company}</p>
//           )}
//         </div>

//         {/* Issue Management Section */}
//         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <div>
//               <h2 className="text-2xl font-bold text-white mb-2">
//                 Issue Management
//               </h2>
//               <p className="text-gray-400">
//                 Manage your security issues and assessments
//               </p>
//             </div>
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
//             >
//               + Create Issue
//             </button>
//           </div>

//           {/* Filter Buttons */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {["all", "cloud-security", "reteam-assessment", "vapt"].map(
//               (filterType) => (
//                 <button
//                   key={filterType}
//                   onClick={() => {
//                     setFilter(filterType);
//                   }}
//                   className={`px-4 py-2 rounded-lg font-medium transition ${
//                     filter === filterType
//                       ? "bg-purple-500 text-white"
//                       : "bg-white/5 text-gray-300 hover:bg-white/10"
//                   }`}
//                 >
//                   {filterType === "all"
//                     ? "All Issues"
//                     : getIssueTypeLabel(filterType)}
//                 </button>
//               )
//             )}
//           </div>

//           {/* Issues List */}
//           {issues.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="text-6xl mb-4">📋</div>
//               <p className="text-gray-400 text-lg">
//                 No issues yet. Create your first one!
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {issues.map((issue) => (
//                 <div
//                   key={issue._id}
//                   className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
//                 >
//                   <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//                     <div className="flex-1">
//                       <div className="flex flex-wrap items-center gap-2 mb-3">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold border ${getIssueTypeColor(
//                             issue.type
//                           )}`}
//                         >
//                           {getIssueTypeLabel(issue.type)}
//                         </span>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
//                             issue.priority
//                           )}`}
//                         >
//                           {issue.priority.toUpperCase()}
//                         </span>
//                         <span className="text-gray-500 text-sm">
//                           {new Date(issue.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <h3 className="text-xl font-semibold text-white mb-2">
//                         {issue.title}
//                       </h3>
//                       <p className="text-gray-300">{issue.description}</p>
//                     </div>
//                     <button
//                       onClick={() => handleDeleteIssue(issue._id)}
//                       className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create Issue Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-purple-500/20">
//             <h2 className="text-2xl font-bold text-white mb-6">
//               Create New Issue
//             </h2>
//             <form onSubmit={handleCreateIssue} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Issue Type *
//                 </label>
//                 <select
//                   required
//                   value={formData.type}
//                   onChange={(e) =>
//                     setFormData({ ...formData, type: e.target.value })
//                   }
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   <option value="cloud-security">Cloud Security</option>
//                   <option value="reteam-assessment">Reteam Assessment</option>
//                   <option value="vapt">VAPT</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Title *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.title}
//                   onChange={(e) =>
//                     setFormData({ ...formData, title: e.target.value })
//                   }
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter issue title"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Description *
//                 </label>
//                 <textarea
//                   required
//                   rows={4}
//                   value={formData.description}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Describe the issue in detail"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   Priority
//                 </label>
//                 <select
//                   value={formData.priority}
//                   onChange={(e) =>
//                     setFormData({ ...formData, priority: e.target.value })
//                   }
//                   className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   <option value="low">Low</option>
//                   <option value="medium">Medium</option>
//                   <option value="high">High</option>
//                   <option value="critical">Critical</option>
//                 </select>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   type="submit"
//                   className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
//                 >
//                   Create Issue
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateModal(false)}
//                   className="flex-1 px-6 py-3 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  company?: string;
}

interface Issue {
  _id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [formData, setFormData] = useState({
    type: "cloud-security",
    title: "",
    description: "",
    priority: "medium",
  });
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "open",
  });

  useEffect(() => {
    fetchIssues();
  }, [filter]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url =
        filter !== "all" ? `/api/issues?type=${filter}` : "/api/issues";

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setIssues(data.data.issues);
      }
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIssue = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setShowCreateModal(false);
        setFormData({
          type: "cloud-security",
          title: "",
          description: "",
          priority: "medium",
        });
        fetchIssues();
      }
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
  };

  const handleEditClick = (issue: Issue) => {
    setEditingIssue(issue);
    setEditFormData({
      title: issue.title,
      description: issue.description,
      priority: issue.priority,
      status: issue.status,
    });
    setShowEditModal(true);
  };

  const handleEditIssue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingIssue) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/issues/${editingIssue._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFormData),
      });

      const data = await response.json();
      if (data.success) {
        setShowEditModal(false);
        setEditingIssue(null);
        fetchIssues();
      }
    } catch (error) {
      console.error("Failed to update issue:", error);
    }
  };

  const handleDeleteIssue = async (id: string) => {
    if (!confirm("Are you sure you want to delete this issue?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/issues/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchIssues();
      }
    } catch (error) {
      console.error("Failed to delete issue:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const getIssueTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      "cloud-security": "Cloud Security",
      "reteam-assessment": "Reteam Assessment",
      vapt: "VAPT",
    };
    return labels[type] || type;
  };

  const getIssueTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "cloud-security": "bg-blue-500/20 text-blue-300 border-blue-500/50",
      "reteam-assessment":
        "bg-purple-500/20 text-purple-300 border-purple-500/50",
      vapt: "bg-orange-500/20 text-orange-300 border-orange-500/50",
    };
    return colors[type] || "bg-gray-500/20 text-gray-300 border-gray-500/50";
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      low: "bg-green-500/20 text-green-300",
      medium: "bg-yellow-500/20 text-yellow-300",
      high: "bg-red-500/20 text-red-300",
      critical: "bg-red-700/20 text-red-400",
    };
    return colors[priority] || "bg-gray-500/20 text-gray-300";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🛡️</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                ApniSec
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-300">{user?.email}</p>
          {user?.company && (
            <p className="text-gray-400 mt-1">Company: {user.company}</p>
          )}
        </div>

        {/* Issue Management Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Issue Management
              </h2>
              <p className="text-gray-400">
                Manage your security issues and assessments
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition"
            >
              + Create Issue
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["all", "cloud-security", "reteam-assessment", "vapt"].map(
              (filterType) => (
                <button
                  key={filterType}
                  onClick={() => {
                    setFilter(filterType);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === filterType
                      ? "bg-purple-500 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {filterType === "all"
                    ? "All Issues"
                    : getIssueTypeLabel(filterType)}
                </button>
              )
            )}
          </div>

          {/* Issues List */}
          {issues.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-400 text-lg">
                No issues yet. Create your first one!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue) => (
                <div
                  key={issue._id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getIssueTypeColor(
                            issue.type
                          )}`}
                        >
                          {getIssueTypeLabel(issue.type)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
                            issue.priority
                          )}`}
                        >
                          {issue.priority.toUpperCase()}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {issue.title}
                      </h3>
                      <p className="text-gray-300">{issue.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(issue)}
                        className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteIssue(issue._id)}
                        className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Issue Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Create New Issue
            </h2>
            <form onSubmit={handleCreateIssue} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Issue Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="cloud-security">Cloud Security</option>
                  <option value="reteam-assessment">Reteam Assessment</option>
                  <option value="vapt">VAPT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter issue title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe the issue in detail"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Create Issue
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-6 py-3 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Issue Modal */}
      {showEditModal && editingIssue && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Issue</h2>
            <form onSubmit={handleEditIssue} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Issue Type
                </label>
                <div className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-400">
                  {getIssueTypeLabel(editingIssue.type)} (Cannot be changed)
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter issue title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe the issue in detail"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={editFormData.priority}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      priority: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Update Issue
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingIssue(null);
                  }}
                  className="flex-1 px-6 py-3 bg-white/5 text-white rounded-lg font-semibold hover:bg-white/10 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
