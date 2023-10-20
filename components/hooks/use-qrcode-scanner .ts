import { useState, useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";

const useQrcodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const formatsToSupport = [
      Html5QrcodeSupportedFormats.QR_CODE,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
    ];

    const config = {
      fps: 10,
      qrbox: { width: 300, height: 300 },
      rememberLastUsedCamera: true,
      formatsToSupport: formatsToSupport,
    };

    const scanner = new Html5QrcodeScanner(
      "reader-qrcode-scaner",
      config,
      /* verbose= */ false
    );

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(result: any) {
      scanner.clear();
      setScanResult(result);
    }

    function onScanError(error: any) {
      console.warn(error);
      // Handle the scanned code as you like, for example:
      console.log(`Code matched = ${error}`, error);
    }
  }, []);
  return {
    scanResult,
  };
};

export { useQrcodeScanner };
