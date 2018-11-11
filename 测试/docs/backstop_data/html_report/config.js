report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/yangliu_qqmap_0_document_0_phone.png",
        "test": "../../../backstop_data/bitmaps_test/20181110-144240/yangliu_qqmap_0_document_0_phone.png",
        "selector": "document",
        "fileName": "yangliu_qqmap_0_document_0_phone.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "3.94",
          "analysisTime": 15
        },
        "diffImage": "../../../backstop_data/bitmaps_test/20181110-144240/failed_diff_yangliu_qqmap_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../../../backstop_data/bitmaps_reference/yangliu_qqmap_0_document_1_tablet.png",
        "test": "../../../backstop_data/bitmaps_test/20181110-144240/yangliu_qqmap_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "yangliu_qqmap_0_document_1_tablet.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "error": "Reference file not found /Users/mr.yang/Documents/GitHub/YD-Note/测试/backstop_data/bitmaps_reference/yangliu_qqmap_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "yangliu"
});