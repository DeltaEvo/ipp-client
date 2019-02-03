const enums = {
	"document-state": [                                            // ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
	  0x00,
	  0x01,
	  0x02,
	  "pending",                                                        // 0x03
	  0x04,                                                             // 0x04
	  "processing",                                                     // 0x05
	  0x06,                                                                 // 0x06
	  "canceled",                                                       // 0x07
	  "aborted",                                                        // 0x08
	  "completed"                                                       // 0x09
	],
	  "finishings": ([
		,,,                                                               // 0x00 - 0x02
	  "none",                                                           // 0x03 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "staple",                                                         // 0x04 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "punch",                                                          // 0x05 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "cover",                                                          // 0x06 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "bind",                                                           // 0x07 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "saddle-stitch",                                                  // 0x08 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "edge-stitch",                                                    // 0x09 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "fold",                                                           // 0x0A http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "trim",                                                           // 0x0B ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
	  "bale",                                                           // 0x0C ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
	  "booklet-maker",                                                  // 0x0D ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
	  "jog-offset",                                                     // 0x0E ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
	  ,,,,,                                                             // 0x0F - 0x13 reserved for future generic finishing enum values.
	  "staple-top-left",                                                // 0x14 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "staple-bottom-left",                                             // 0x15 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "staple-top-right",                                               // 0x16 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "staple-bottom-right",                                            // 0x17 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "edge-stitch-left",                                               // 0x18 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "edge-stitch-top",                                                // 0x19 http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "edge-stitch-right",                                              // 0x1A http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "edge-stitch-bottom",                                             // 0x1B http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "staple-dual-left",                                               // 0x1C http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "staple-dual-top",                                                // 0x1D http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "staple-dual-right",                                              // 0x1E http://tools.ietf.org/html/rfc2911#section-4.2.6
	  "staple-dual-bottom",                                             // 0x1F http://tools.ietf.org/html/rfc2911#section-4.2.6
	  ,,,,,,,,,,,,,,,,,,                                                // 0x20 - 0x31 reserved for future specific stapling and stitching enum values.
	  "bind-left",                                                      // 0x32 ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
	  "bind-top",                                                       // 0x33 ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
	  "bind-right",                                                     // 0x34 ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
	  "bind-bottom",                                                    // 0x35 ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
	  ,,,,,,                                                            // 0x36 - 0x3B
	  "trim-after-pages",                                               // 0x3C ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (IPP Everywhere)
	  "trim-after-documents",                                           // 0x3D ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (IPP Everywhere)
	  "trim-after-copies",                                              // 0x3E ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (IPP Everywhere)
	  "trim-after-job"                                                  // 0x3F ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (IPP Everywhere)
	]),
	"operations-supported": {
	  [0x02]: "Print-Job",                                                      // 0x02 http://tools.ietf.org/html/rfc2911#section-3.2.1
	  [0x03]: "Print-URI",                                                      // 0x03 http://tools.ietf.org/html/rfc2911#section-3.2.2
	  [0x04]: "Validate-Job",                                                   // 0x04 http://tools.ietf.org/html/rfc2911#section-3.2.3
	  [0x05]: "Create-Job",                                                     // 0x05 http://tools.ietf.org/html/rfc2911#section-3.2.4
	  [0x06]: "Send-Document",                                                  // 0x06 http://tools.ietf.org/html/rfc2911#section-3.3.1
	  [0x07]: "Send-URI",                                                       // 0x07 http://tools.ietf.org/html/rfc2911#section-3.3.2
	  [0x08]: "Cancel-Job",                                                     // 0x08 http://tools.ietf.org/html/rfc2911#section-3.3.3
	  [0x09]: "Get-Job-Attributes",                                             // 0x09 http://tools.ietf.org/html/rfc2911#section-3.3.4
	  [0x0A]: "Get-Jobs",                                                       // 0x0A http://tools.ietf.org/html/rfc2911#section-3.2.6
	  [0x0B]: "Get-Printer-Attributes",                                         // 0x0B http://tools.ietf.org/html/rfc2911#section-3.2.5
	  [0x0C]: "Hold-Job",                                                       // 0x0C http://tools.ietf.org/html/rfc2911#section-3.3.5
	  [0x0D]: "Release-Job",                                                    // 0x0D http://tools.ietf.org/html/rfc2911#section-3.3.6
	  [0x0E]: "Restart-Job",                                                    // 0x0E http://tools.ietf.org/html/rfc2911#section-3.3.7
	  [0x10]: "Pause-Printer",                                                  // 0x10 http://tools.ietf.org/html/rfc2911#section-3.2.7
	  [0x11]: "Resume-Printer",                                                 // 0x11 http://tools.ietf.org/html/rfc2911#section-3.2.8
	  [0x12]: "Purge-Jobs",                                                     // 0x12 http://tools.ietf.org/html/rfc2911#section-3.2.9
	  [0x13]: "Set-Printer-Attributes",                                         // 0x13 IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.1
	  [0x14]: "Set-Job-Attributes",                                             // 0x14 IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.2
	  [0x15]: "Get-Printer-Supported-Values",                                   // 0x15 IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.3
	  [0x16]: "Create-Printer-Subscriptions",                                   // 0x16 IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.1.2
	  [0x17]: "Create-Job-Subscription",                                        // 0x17 IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.1.1
	  [0x18]: "Get-Subscription-Attributes",                                    // 0x18 IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.4
	  [0x19]: "Get-Subscriptions",                                              // 0x19 IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.5
	  [0x1A]: "Renew-Subscription",                                             // 0x1A IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.6
	  [0x1B]: "Cancel-Subscription",                                            // 0x1B IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.7
	  [0x1C]: "Get-Notifications",                                              // 0x1C IPP2.1 IPP2.1 http://tools.ietf.org/html/rfc3996#section-9.2 && http://tools.ietf.org/html/rfc3996#section-5
	  [0x1D]: "ipp-indp-method",                                                // 0x1D did not get standardized
	  [0x1E]: "Get-Resource-Attributes",                                        // 0x1E http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.1 did not get standardized
	  [0x1F]: "Get-Resource-Data",                                              // 0x1F http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.2 did not get standardized
	  [0x20]: "Get-Resources",                                                  // 0x20 http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.3 did not get standardized
	  [0x21]: "ipp-install",                                                    // 0x21 did not get standardized
	  [0x22]: "Enable-Printer",                                                 // 0x22 http://tools.ietf.org/html/rfc3998#section-3.1.1
	  [0x23]: "Disable-Printer",                                                // 0x23 http://tools.ietf.org/html/rfc3998#section-3.1.2
	  [0x24]: "Pause-Printer-After-Current-Job",                                // 0x24 http://tools.ietf.org/html/rfc3998#section-3.2.1
	  [0x25]: "Hold-New-Jobs",                                                  // 0x25 http://tools.ietf.org/html/rfc3998#section-3.3.1
	  [0x26]: "Release-Held-New-Jobs",                                          // 0x26 http://tools.ietf.org/html/rfc3998#section-3.3.2
	  [0x27]: "Deactivate-Printer",                                             // 0x27 http://tools.ietf.org/html/rfc3998#section-3.4.1
	  [0x28]: "Activate-Printer",                                               // 0x28 http://tools.ietf.org/html/rfc3998#section-3.4.2
	  [0x29]: "Restart-Printer",                                                // 0x29 http://tools.ietf.org/html/rfc3998#section-3.5.1
	  [0x2A]: "Shutdown-Printer",                                               // 0x2A http://tools.ietf.org/html/rfc3998#section-3.5.2
	  [0x2B]: "Startup-Printer",                                                // 0x2B http://tools.ietf.org/html/rfc3998#section-3.5.3
	  [0x2C]: "Reprocess-Job",                                                  // 0x2C http://tools.ietf.org/html/rfc3998#section-4.1
	  [0x2D]: "Cancel-Current-Job",                                             // 0x2D http://tools.ietf.org/html/rfc3998#section-4.2
	  [0x2E]: "Suspend-Current-Job",                                            // 0x2E http://tools.ietf.org/html/rfc3998#section-4.3.1
	  [0x2F]: "Resume-Job",                                                     // 0x2F http://tools.ietf.org/html/rfc3998#section-4.3.2
	  [0x30]: "Promote-Job",                                                    // 0x30 http://tools.ietf.org/html/rfc3998#section-4.4.1
	  [0x31]: "Schedule-Job-After",                                             // 0x31 http://tools.ietf.org/html/rfc3998#section-4.4.2
	  [0x33]: "Cancel-Document",                                                // 0x33 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
	  [0x34]: "Get-Document-Attributes",                                        // 0x34 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
	  [0x35]: "Get-Documents",                                                  // 0x35 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
	  [0x36]: "Delete-Document",                                                // 0x36 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
	  [0x37]: "Set-Document-Attributes",                                        // 0x37 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
	  [0x38]: "Cancel-Jobs",                                                    // 0x38 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
	  [0x39]: "Cancel-My-Jobs",                                                 // 0x39 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
	  [0x3A]: "Resubmit-Job",                                                   // 0x3A ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
	  [0x3B]: "Close-Job",                                                      // 0x3B ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
	  [0x3C]: "Identify-Printer",                                               // 0x3C ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
	  [0x3D]: "Validate-Document",                                              // 0x3D ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
	  [0x4001]: "CUPS-Get-Default",
	  [0x4002]: "CUPS-Get-Printers",
	  [0x4003]: "CUPS-Add-Modify-Printer",
	  [0x4004]: "CUPS-Delete-Printer",
	  [0x4005]: "CUPS-Get-Classes",
	  [0x4006]: "CUPS-Add-Modify-Classe",
	  [0x4007]: "CUPS-Delete-Classe",
	  [0x4008]: "CUPS-Accept-Jobs",
	  [0x4009]: "CUPS-Reject-Jobs",
	  [0x400A]: "CUPS-Set-Default",
	  [0x400B]: "CUPS-Get-Devices",
	  [0x400C]: "CUPS-Get-PPDs",
	  [0x400D]: "CUPS-Move-Job",
	  [0x400E]: "CUPS-Authenticate-Job",
	  [0x400F]: "CUPS-Get-PPD",
	  [0x4027]: "CUPS-Get-Document",
	  [0x4028]: "CUPS-Create-Local-Printer",
	},
	"job-collation-type": ([                                        // IPP2.1 http://tools.ietf.org/html/rfc3381#section-6.3
	  "other",                                                          // 0x01
	  "unknown",                                                        // 0x02
	  "uncollated-documents",                                           // 0x03
	  'collated-documents',                                             // 0x04
	  'uncollated-documents'                                            // 0x05
	]),
	"job-state": ([                                                 // http://tools.ietf.org/html/rfc2911#section-4.3.7
	  ,,,                                                               // 0x00-0x02
	  "pending",                                                        // 0x03
	  "pending-held",                                                   // 0x04
	  "processing",                                                     // 0x05
	  "processing-stopped",                                             // 0x06
	  "canceled",                                                       // 0x07
	  "aborted",                                                        // 0x08
	  "completed"                                                       // 0x09
	]),
	"orientation-requested": ([                                     // http://tools.ietf.org/html/rfc2911#section-4.2.10
	  ,,,                                                               // 0x00-0x02
	  "portrait",                                                       // 0x03
	  "landscape",                                                      // 0x04
	  "reverse-landscape",                                              // 0x05
	  "reverse-portrait",                                               // 0x06
	  "none"                                                            // 0x07 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
	]),
	"print-quality": ([                                             // http://tools.ietf.org/html/rfc2911#section-4.2.13
	  ,,,                                                               // 0x00-0x02
	  "draft",                                                          // 0x03
	  "normal",                                                         // 0x04
	  "high"                                                            // 0x05
	]),
	"printer-state": ([                                             // http://tools.ietf.org/html/rfc2911#section-4.4.11
	  0x00,
	  0x01,
	  0x02,                                                             // 0x00-0x02
	  "idle",                                                           // 0x03
	  "processing",                                                     // 0x04
	  "stopped"                                                         // 0x05
	]),
	"printer-type": [ // https://www.cups.org/doc/spec-ipp.html
		"printer-local",
		"printer-class",
		"printer-remote",
		0x03,
		"printer-bw",
	]
  };
  enums["finishings-default"] = enums.finishings;
  enums["finishings-ready"] = enums.finishings;
  enums["finishings-supported"] = enums.finishings;
  enums["media-source-feed-orientation"] = enums["orientation-requested"];
  enums["orientation-requested-default"] = enums["orientation-requested"];
  enums["orientation-requested-supported"] = enums["orientation-requested"];//1setOf
  enums["print-quality-default"] = enums["print-quality"];
  enums["print-quality-supported"] = enums["print-quality"];//1setOf
	
	export default enums;
