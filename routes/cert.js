const express = require("express");
const router = express.Router();
const auth = require("../utils/authMiddleware");
const PDFDocument = require("pdfkit");
const Result = require("../models/Result");
const User = require("../models/User");

function generateCertificatePDF(res, user, result) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const filename = `certificate_${user.name.replace(/\s+/g, "_")}.pdf`;
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.setHeader("Content-Type", "application/pdf");

  doc.pipe(res);

  doc.fontSize(26).font("Times-Bold").text("Certificate of Completion", {
    align: "center",
  });
  doc.moveDown(2);

  doc.fontSize(19).text("This is to certify that", { align: "center" });
  doc.moveDown(0.5);

  doc.fontSize(25).font("Times-Bold").text(user.name, {
    align: "center",
    underline: true,
  });
  doc.moveDown(1);

  doc.fontSize(17).font("Times-Roman").text(
    `has successfully completed the quiz: Web Devlopment Quiz`,
    { align: "center" }
  );
  doc.moveDown(0.8);

  doc
    .fontSize(17)
    .text(
      `Score: ${result.score}% (${result.passed ? "Passed" : "Failed"})`,
      { align: "center" }
    );
  doc.moveDown(1.5);

  doc
    .fontSize(15)
    .text(`Date: ${new Date(result.date).toLocaleDateString()}`, {
      align: "center",
    });

  doc.moveDown(5);
  doc
    .fontSize(15)
    .font("Times-Italic")
    .text("Authorized by: LMS Micro-Certification Portal", {
      align: "center",
    });

  doc.end();
}

router.get("/download/:resultId", auth, async (req, res) => {
  try {
    const { resultId } = req.params;

    const result = await Result.findById(resultId);
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    if (result.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(result.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    generateCertificatePDF(res, user, result);
  } catch (err) {
    console.error("Error generating certificate:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
