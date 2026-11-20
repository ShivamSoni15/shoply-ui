export function notFoundHandler(_req, res) {
  res.status(404).json({ success: false, message: "API route not found" });
}

export function errorHandler(error, _req, res, _next) {
  if (error.message === "Origin is not allowed by CORS") {
    return res.status(403).json({ success: false, message: error.message });
  }
  if (error?.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Invalid request data",
      errors: error.issues?.map(({ path, message }) => ({ path: path.join("."), message })),
    });
  }

  if (error?.code === 11000) {
    return res.status(409).json({ success: false, message: "An account with that email already exists." });
  }

  if (error?.name === "CastError") {
    return res.status(404).json({ success: false, message: "Requested resource not found." });
  }

  if (error?.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Request body must contain valid JSON." });
  }

  const status = Number(error.statusCode) || 500;
  if (status >= 500) console.error(error);
  return res.status(status).json({
    success: false,
    message: status >= 500 ? "Internal server error" : error.message,
  });
}
