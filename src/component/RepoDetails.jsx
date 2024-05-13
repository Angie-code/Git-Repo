import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RepoDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    console.log("ID:", id);

    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/angie-code/${id}`
        );
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repository details:", error);
        console.log("Error response:", error.response); // Log the full error response
        setError("An error occurred while fetching repository details.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div>
      <h1 className="text-center text-5xl mb-5">Repository Details</h1>
      {loading && <p>Loading details...</p>}
      {error && <p>{error}</p>}
      {details && (
        <div>
          <h2>{details.name}</h2>
          <p>{details.description}</p>
        </div>
      )}
    </div>
  );
};

export default RepoDetails;
