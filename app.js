/* ============================================================
   RevenueScope — app.js  (v2)
   Senior Data Analyst + Senior Frontend Engineer

   Schema:
     Sale_Date, Sales_Rep, Region, Sales_Amount, Quantity_Sold,
     Product_Category, Unit_Cost, Unit_Price, Customer_Type,
     Discount, Payment_Method, Sales_Channel, Region_and_Sales_Rep

   Formulas:
     Revenue       = Quantity_Sold × Unit_Price × (1 − Discount)
     Net Profit    = Quantity_Sold × (Unit_Price × (1 − Discount) − Unit_Cost)
     Profit Margin = (Net Profit / Revenue) × 100

   Currency: Indonesian Rupiah (id-ID, IDR)
   Data:     Drag-and-drop CSV/JSON via PapaParse, fallback mock
   Export:   Filtered data → CSV or JSON
   Print:    @media print via window.print()
   ============================================================ */

'use strict';

/* ══════════════════════════════════════════════════════════════
   1.  MOCK DATASET  (200 rows · fallback when no file uploaded)
══════════════════════════════════════════════════════════════ */
const MOCK_ROWS = [
  ["2023-01-03","Alice","North",4200,12,"Electronics",180,380,0.05,"Returning","Credit Card","Online","North_Alice"],
  ["2023-01-05","Bob","South",3100,8,"Clothing",60,200,0.10,"New","Cash","Retail","South_Bob"],
  ["2023-01-07","Charlie","East",5600,20,"Electronics",180,310,0.00,"Returning","Bank Transfer","Online","East_Charlie"],
  ["2023-01-09","David","West",2200,6,"Furniture",200,420,0.15,"New","Credit Card","Retail","West_David"],
  ["2023-01-11","Eve","North",1800,10,"Clothing",55,195,0.05,"New","Cash","Online","North_Eve"],
  ["2023-01-14","Alice","South",6300,18,"Electronics",185,375,0.00,"Returning","Credit Card","Online","South_Alice"],
  ["2023-01-16","Bob","East",4100,14,"Furniture",195,410,0.10,"Returning","Bank Transfer","Retail","East_Bob"],
  ["2023-01-18","Charlie","West",2900,9,"Clothing",58,330,0.05,"New","Cash","Online","West_Charlie"],
  ["2023-01-20","David","North",3500,11,"Electronics",175,340,0.00,"Returning","Credit Card","Online","North_David"],
  ["2023-01-22","Eve","South",4800,16,"Furniture",205,415,0.08,"New","Bank Transfer","Retail","South_Eve"],
  ["2023-01-25","Alice","East",2600,7,"Clothing",62,390,0.12,"New","Cash","Online","East_Alice"],
  ["2023-01-27","Bob","West",5400,19,"Electronics",182,310,0.00,"Returning","Credit Card","Online","West_Bob"],
  ["2023-01-29","Charlie","North",3800,13,"Furniture",198,405,0.05,"Returning","Bank Transfer","Retail","North_Charlie"],
  ["2023-02-02","David","South",2100,8,"Clothing",57,275,0.15,"New","Cash","Online","South_David"],
  ["2023-02-04","Eve","East",4900,17,"Electronics",178,300,0.00,"Returning","Credit Card","Online","East_Eve"],
  ["2023-02-06","Alice","West",3300,10,"Furniture",202,420,0.10,"New","Bank Transfer","Retail","West_Alice"],
  ["2023-02-08","Bob","North",2700,9,"Clothing",60,305,0.08,"Returning","Cash","Online","North_Bob"],
  ["2023-02-10","Charlie","South",5100,18,"Electronics",183,318,0.00,"Returning","Credit Card","Online","South_Charlie"],
  ["2023-02-12","David","East",4200,14,"Furniture",196,408,0.05,"New","Bank Transfer","Retail","East_David"],
  ["2023-02-15","Eve","West",3000,10,"Clothing",59,310,0.12,"New","Cash","Online","West_Eve"],
  ["2023-02-17","Alice","North",5700,20,"Electronics",180,300,0.00,"Returning","Credit Card","Online","North_Alice"],
  ["2023-02-19","Bob","South",2400,7,"Furniture",204,425,0.10,"New","Bank Transfer","Retail","South_Bob"],
  ["2023-02-21","Charlie","East",3600,12,"Clothing",56,305,0.05,"Returning","Cash","Online","East_Charlie"],
  ["2023-02-23","David","West",4800,16,"Electronics",176,318,0.00,"Returning","Credit Card","Online","West_David"],
  ["2023-02-25","Eve","North",2900,9,"Furniture",201,415,0.08,"New","Bank Transfer","Retail","North_Eve"],
  ["2023-02-27","Alice","South",3200,11,"Clothing",61,295,0.15,"New","Cash","Online","South_Alice"],
  ["2023-03-01","Bob","East",5300,19,"Electronics",181,312,0.00,"Returning","Credit Card","Online","East_Bob"],
  ["2023-03-03","Charlie","West",4000,13,"Furniture",199,412,0.05,"Returning","Bank Transfer","Retail","West_Charlie"],
  ["2023-03-05","David","North",2500,8,"Clothing",58,300,0.10,"New","Cash","Online","North_David"],
  ["2023-03-07","Eve","South",6100,22,"Electronics",179,305,0.00,"Returning","Credit Card","Online","South_Eve"],
  ["2023-03-09","Alice","East",3700,12,"Furniture",203,418,0.08,"New","Bank Transfer","Retail","East_Alice"],
  ["2023-03-11","Bob","West",2800,9,"Clothing",57,290,0.05,"Returning","Cash","Online","West_Bob"],
  ["2023-03-14","Charlie","North",5500,20,"Electronics",184,320,0.00,"Returning","Credit Card","Online","North_Charlie"],
  ["2023-03-16","David","South",4300,14,"Furniture",197,410,0.10,"New","Bank Transfer","Retail","South_David"],
  ["2023-03-18","Eve","East",2100,7,"Clothing",62,308,0.15,"New","Cash","Online","East_Eve"],
  ["2023-03-20","Alice","West",4700,16,"Electronics",177,315,0.00,"Returning","Credit Card","Online","West_Alice"],
  ["2023-03-22","Bob","North",3400,11,"Furniture",205,422,0.05,"Returning","Bank Transfer","Retail","North_Bob"],
  ["2023-03-24","Charlie","South",2600,8,"Clothing",59,330,0.12,"New","Cash","Online","South_Charlie"],
  ["2023-03-26","David","East",5900,21,"Electronics",183,316,0.00,"Returning","Credit Card","Online","East_David"],
  ["2023-03-28","Eve","West",3100,10,"Furniture",200,415,0.08,"New","Bank Transfer","Retail","West_Eve"],
  ["2023-04-01","Alice","North",4400,15,"Clothing",60,302,0.10,"Returning","Cash","Online","North_Alice"],
  ["2023-04-03","Bob","South",5800,21,"Electronics",180,308,0.00,"Returning","Credit Card","Online","South_Bob"],
  ["2023-04-05","Charlie","East",3300,11,"Furniture",198,420,0.05,"New","Bank Transfer","Retail","East_Charlie"],
  ["2023-04-07","David","West",2700,9,"Clothing",56,285,0.15,"New","Cash","Online","West_David"],
  ["2023-04-09","Eve","North",6200,22,"Electronics",182,315,0.00,"Returning","Credit Card","Online","North_Eve"],
  ["2023-04-11","Alice","South",3800,12,"Furniture",204,416,0.08,"New","Bank Transfer","Retail","South_Alice"],
  ["2023-04-13","Bob","East",2300,7,"Clothing",61,298,0.10,"Returning","Cash","Online","East_Bob"],
  ["2023-04-15","Charlie","West",5400,19,"Electronics",179,309,0.00,"Returning","Credit Card","Online","West_Charlie"],
  ["2023-04-17","David","North",4100,13,"Furniture",199,408,0.05,"New","Bank Transfer","Retail","North_David"],
  ["2023-04-19","Eve","South",2900,9,"Clothing",58,295,0.12,"New","Cash","Online","South_Eve"],
  ["2023-04-21","Alice","East",5100,18,"Electronics",181,312,0.00,"Returning","Credit Card","Online","East_Alice"],
  ["2023-04-23","Bob","West",3600,12,"Furniture",202,414,0.08,"Returning","Bank Transfer","Retail","West_Bob"],
  ["2023-04-25","Charlie","North",2100,7,"Clothing",57,310,0.20,"New","Cash","Online","North_Charlie"],
  ["2023-04-27","David","South",6400,23,"Electronics",178,307,0.00,"Returning","Credit Card","Online","South_David"],
  ["2023-04-29","Eve","East",3400,11,"Furniture",205,418,0.05,"New","Bank Transfer","Retail","East_Eve"],
  ["2023-05-02","Alice","West",2600,8,"Clothing",60,305,0.15,"New","Cash","Online","West_Alice"],
  ["2023-05-04","Bob","North",5600,20,"Electronics",183,314,0.00,"Returning","Credit Card","Online","North_Bob"],
  ["2023-05-06","Charlie","South",4200,14,"Furniture",196,412,0.08,"Returning","Bank Transfer","Retail","South_Charlie"],
  ["2023-05-08","David","East",2800,9,"Clothing",55,288,0.10,"New","Cash","Online","East_David"],
  ["2023-05-10","Eve","West",5900,21,"Electronics",180,310,0.00,"Returning","Credit Card","Online","West_Eve"],
  ["2023-05-12","Alice","North",3500,11,"Furniture",203,420,0.05,"New","Bank Transfer","Retail","North_Alice"],
  ["2023-05-14","Bob","South",2100,7,"Clothing",62,300,0.12,"Returning","Cash","Online","South_Bob"],
  ["2023-05-16","Charlie","East",4900,17,"Electronics",179,306,0.00,"Returning","Credit Card","Online","East_Charlie"],
  ["2023-05-18","David","West",3700,12,"Furniture",201,416,0.05,"New","Bank Transfer","Retail","West_David"],
  ["2023-05-20","Eve","North",2400,8,"Clothing",57,292,0.15,"New","Cash","Online","North_Eve"],
  ["2023-05-22","Alice","South",6300,22,"Electronics",184,319,0.00,"Returning","Credit Card","Online","South_Alice"],
  ["2023-05-24","Bob","East",3100,10,"Furniture",200,408,0.08,"Returning","Bank Transfer","Retail","East_Bob"],
  ["2023-05-26","Charlie","West",2700,9,"Clothing",56,298,0.10,"New","Cash","Online","West_Charlie"],
  ["2023-05-28","David","North",5100,18,"Electronics",181,311,0.00,"Returning","Credit Card","Online","North_David"],
  ["2023-05-30","Eve","South",4400,14,"Furniture",198,414,0.05,"New","Bank Transfer","Retail","South_Eve"],
  ["2023-06-01","Alice","East",2200,7,"Clothing",61,305,0.15,"New","Cash","Online","East_Alice"],
  ["2023-06-03","Bob","West",5700,20,"Electronics",182,313,0.00,"Returning","Credit Card","Online","West_Bob"],
  ["2023-06-05","Charlie","North",3300,11,"Furniture",204,422,0.08,"Returning","Bank Transfer","Retail","North_Charlie"],
  ["2023-06-07","David","South",2900,9,"Clothing",58,295,0.12,"New","Cash","Online","South_David"],
  ["2023-06-09","Eve","East",6100,22,"Electronics",177,308,0.00,"Returning","Credit Card","Online","East_Eve"],
  ["2023-06-11","Alice","West",3800,12,"Furniture",199,410,0.05,"New","Bank Transfer","Retail","West_Alice"],
  ["2023-06-13","Bob","North",2500,8,"Clothing",60,310,0.10,"Returning","Cash","Online","North_Bob"],
  ["2023-06-15","Charlie","South",5300,19,"Electronics",183,317,0.00,"Returning","Credit Card","Online","South_Charlie"],
  ["2023-06-17","David","East",4100,13,"Furniture",202,418,0.05,"New","Bank Transfer","Retail","East_David"],
  ["2023-06-19","Eve","West",2300,7,"Clothing",57,285,0.20,"New","Cash","Online","West_Eve"],
  ["2023-06-21","Alice","North",5500,19,"Electronics",180,312,0.00,"Returning","Credit Card","Online","North_Alice"],
  ["2023-06-23","Bob","South",3600,12,"Furniture",205,420,0.08,"Returning","Bank Transfer","Retail","South_Bob"],
  ["2023-06-25","Charlie","East",2000,6,"Clothing",56,295,0.15,"New","Cash","Online","East_Charlie"],
  ["2023-06-27","David","West",4700,17,"Electronics",178,307,0.00,"Returning","Credit Card","Online","West_David"],
  ["2023-06-29","Eve","North",3200,10,"Furniture",201,412,0.05,"New","Bank Transfer","Retail","North_Eve"],
  ["2023-07-02","Alice","South",2700,9,"Clothing",62,308,0.10,"Returning","Cash","Online","South_Alice"],
  ["2023-07-04","Bob","East",6200,22,"Electronics",181,315,0.00,"Returning","Credit Card","Online","East_Bob"],
  ["2023-07-06","Charlie","West",3900,13,"Furniture",197,415,0.05,"New","Bank Transfer","Retail","West_Charlie"],
  ["2023-07-08","David","North",2100,7,"Clothing",55,290,0.15,"New","Cash","Online","North_David"],
  ["2023-07-10","Eve","South",5800,21,"Electronics",179,310,0.00,"Returning","Credit Card","Online","South_Eve"],
  ["2023-07-12","Alice","East",3400,11,"Furniture",203,416,0.08,"New","Bank Transfer","Retail","East_Alice"],
  ["2023-07-14","Bob","West",2600,8,"Clothing",59,300,0.12,"Returning","Cash","Online","West_Bob"],
  ["2023-07-16","Charlie","North",5200,18,"Electronics",182,313,0.00,"Returning","Credit Card","Online","North_Charlie"],
  ["2023-07-18","David","South",4300,14,"Furniture",200,410,0.05,"New","Bank Transfer","Retail","South_David"],
  ["2023-07-20","Eve","East",2500,8,"Clothing",57,295,0.20,"New","Cash","Online","East_Eve"],
  ["2023-07-22","Alice","West",5900,21,"Electronics",183,318,0.00,"Returning","Credit Card","Online","West_Alice"],
  ["2023-07-24","Bob","North",3600,12,"Furniture",204,419,0.08,"Returning","Bank Transfer","Retail","North_Bob"],
  ["2023-07-26","Charlie","South",2200,7,"Clothing",60,302,0.10,"New","Cash","Online","South_Charlie"],
  ["2023-07-28","David","East",4900,17,"Electronics",177,306,0.00,"Returning","Credit Card","Online","East_David"],
  ["2023-07-30","Eve","West",3300,10,"Furniture",199,414,0.05,"New","Bank Transfer","Retail","West_Eve"],
  ["2023-08-01","Alice","North",2800,9,"Clothing",61,310,0.15,"Returning","Cash","Online","North_Alice"],
  ["2023-08-03","Bob","South",5700,20,"Electronics",180,312,0.00,"Returning","Credit Card","Online","South_Bob"],
  ["2023-08-05","Charlie","East",4100,13,"Furniture",202,420,0.08,"New","Bank Transfer","Retail","East_Charlie"],
  ["2023-08-07","David","West",2300,7,"Clothing",56,285,0.12,"New","Cash","Online","West_David"],
  ["2023-08-09","Eve","North",6300,23,"Electronics",178,308,0.00,"Returning","Credit Card","Online","North_Eve"],
  ["2023-08-11","Alice","South",3700,12,"Furniture",205,422,0.05,"New","Bank Transfer","Retail","South_Alice"],
  ["2023-08-13","Bob","East",2100,6,"Clothing",58,298,0.20,"Returning","Cash","Online","East_Bob"],
  ["2023-08-15","Charlie","West",5500,20,"Electronics",181,315,0.00,"Returning","Credit Card","Online","West_Charlie"],
  ["2023-08-17","David","North",3800,12,"Furniture",198,408,0.05,"New","Bank Transfer","Retail","North_David"],
  ["2023-08-19","Eve","South",2600,8,"Clothing",57,292,0.15,"New","Cash","Online","South_Eve"],
  ["2023-08-21","Alice","East",5100,18,"Electronics",184,319,0.00,"Returning","Credit Card","Online","East_Alice"],
  ["2023-08-23","Bob","West",3500,11,"Furniture",203,416,0.08,"Returning","Bank Transfer","Retail","West_Bob"],
  ["2023-08-25","Charlie","North",2900,9,"Clothing",62,310,0.10,"New","Cash","Online","North_Charlie"],
  ["2023-08-27","David","South",6100,22,"Electronics",179,309,0.00,"Returning","Credit Card","Online","South_David"],
  ["2023-08-29","Eve","East",3200,10,"Furniture",201,412,0.05,"New","Bank Transfer","Retail","East_Eve"],
  ["2023-09-01","Alice","West",2400,8,"Clothing",60,305,0.12,"Returning","Cash","Online","West_Alice"],
  ["2023-09-03","Bob","North",5400,19,"Electronics",182,314,0.00,"Returning","Credit Card","Online","North_Bob"],
  ["2023-09-05","Charlie","South",4200,14,"Furniture",197,410,0.08,"New","Bank Transfer","Retail","South_Charlie"],
  ["2023-09-07","David","East",2700,9,"Clothing",55,290,0.15,"New","Cash","Online","East_David"],
  ["2023-09-09","Eve","West",5800,21,"Electronics",180,311,0.00,"Returning","Credit Card","Online","West_Eve"],
  ["2023-09-11","Alice","North",3600,12,"Furniture",204,418,0.05,"New","Bank Transfer","Retail","North_Alice"],
  ["2023-09-13","Bob","South",2200,7,"Clothing",59,300,0.10,"Returning","Cash","Online","South_Bob"],
  ["2023-09-15","Charlie","East",5200,19,"Electronics",183,316,0.00,"Returning","Credit Card","Online","East_Charlie"],
  ["2023-09-17","David","West",3900,13,"Furniture",199,415,0.05,"New","Bank Transfer","Retail","West_David"],
  ["2023-09-19","Eve","North",2100,7,"Clothing",57,288,0.20,"New","Cash","Online","North_Eve"],
  ["2023-09-21","Alice","South",6400,23,"Electronics",181,313,0.00,"Returning","Credit Card","Online","South_Alice"],
  ["2023-09-23","Bob","East",3400,11,"Furniture",205,421,0.08,"Returning","Bank Transfer","Retail","East_Bob"],
  ["2023-09-25","Charlie","West",2600,8,"Clothing",61,308,0.12,"New","Cash","Online","West_Charlie"],
  ["2023-09-27","David","North",5000,18,"Electronics",177,306,0.00,"Returning","Credit Card","Online","North_David"],
  ["2023-09-29","Eve","South",4100,13,"Furniture",200,413,0.05,"New","Bank Transfer","Retail","South_Eve"],
  ["2023-10-01","Alice","East",2800,9,"Clothing",56,295,0.15,"Returning","Cash","Online","East_Alice"],
  ["2023-10-03","Bob","West",5900,21,"Electronics",184,320,0.00,"Returning","Credit Card","Online","West_Bob"],
  ["2023-10-05","Charlie","North",3700,12,"Furniture",202,419,0.08,"New","Bank Transfer","Retail","North_Charlie"],
  ["2023-10-07","David","South",2300,7,"Clothing",58,285,0.12,"New","Cash","Online","South_David"],
  ["2023-10-09","Eve","East",6200,22,"Electronics",179,308,0.00,"Returning","Credit Card","Online","East_Eve"],
  ["2023-10-11","Alice","West",3500,11,"Furniture",203,420,0.05,"New","Bank Transfer","Retail","West_Alice"],
  ["2023-10-13","Bob","North",2500,8,"Clothing",60,310,0.10,"Returning","Cash","Online","North_Bob"],
  ["2023-10-15","Charlie","South",5300,19,"Electronics",182,315,0.00,"Returning","Credit Card","Online","South_Charlie"],
  ["2023-10-17","David","East",4400,14,"Furniture",198,412,0.05,"New","Bank Transfer","Retail","East_David"],
  ["2023-10-19","Eve","West",2700,9,"Clothing",57,292,0.20,"New","Cash","Online","West_Eve"],
  ["2023-10-21","Alice","North",5700,20,"Electronics",180,312,0.00,"Returning","Credit Card","Online","North_Alice"],
  ["2023-10-23","Bob","South",3800,12,"Furniture",205,422,0.08,"Returning","Bank Transfer","Retail","South_Bob"],
  ["2023-10-25","Charlie","East",2000,6,"Clothing",62,302,0.15,"New","Cash","Online","East_Charlie"],
  ["2023-10-27","David","West",5100,18,"Electronics",178,307,0.00,"Returning","Credit Card","Online","West_David"],
  ["2023-10-29","Eve","North",3300,10,"Furniture",201,415,0.05,"New","Bank Transfer","Retail","North_Eve"],
  ["2023-11-01","Alice","South",2900,9,"Clothing",60,308,0.10,"Returning","Cash","Online","South_Alice"],
  ["2023-11-03","Bob","East",6300,23,"Electronics",181,314,0.00,"Returning","Credit Card","Online","East_Bob"],
  ["2023-11-05","Charlie","West",4000,13,"Furniture",199,416,0.08,"New","Bank Transfer","Retail","West_Charlie"],
  ["2023-11-07","David","North",2200,7,"Clothing",55,288,0.15,"New","Cash","Online","North_David"],
  ["2023-11-09","Eve","South",5600,20,"Electronics",183,317,0.00,"Returning","Credit Card","Online","South_Eve"],
  ["2023-11-11","Alice","East",3600,12,"Furniture",204,420,0.05,"New","Bank Transfer","Retail","East_Alice"],
  ["2023-11-13","Bob","West",2400,8,"Clothing",59,298,0.12,"Returning","Cash","Online","West_Bob"],
  ["2023-11-15","Charlie","North",5500,20,"Electronics",180,313,0.00,"Returning","Credit Card","Online","North_Charlie"],
  ["2023-11-17","David","South",4200,14,"Furniture",202,418,0.05,"New","Bank Transfer","Retail","South_David"],
  ["2023-11-19","Eve","East",2600,8,"Clothing",58,295,0.20,"New","Cash","Online","East_Eve"],
  ["2023-11-21","Alice","West",5800,21,"Electronics",179,310,0.00,"Returning","Credit Card","Online","West_Alice"],
  ["2023-11-23","Bob","North",3500,11,"Furniture",205,421,0.08,"Returning","Bank Transfer","Retail","North_Bob"],
  ["2023-11-25","Charlie","South",2300,7,"Clothing",62,310,0.10,"New","Cash","Online","South_Charlie"],
  ["2023-11-27","David","East",4900,17,"Electronics",177,306,0.00,"Returning","Credit Card","Online","East_David"],
  ["2023-11-29","Eve","West",3800,12,"Furniture",200,413,0.05,"New","Bank Transfer","Retail","West_Eve"],
  ["2023-12-01","Alice","North",2700,9,"Clothing",56,295,0.15,"Returning","Cash","Online","North_Alice"],
  ["2023-12-03","Bob","South",6100,22,"Electronics",184,320,0.00,"Returning","Credit Card","Online","South_Bob"],
  ["2023-12-05","Charlie","East",4300,14,"Furniture",198,412,0.08,"New","Bank Transfer","Retail","East_Charlie"],
  ["2023-12-07","David","West",2100,6,"Clothing",60,305,0.10,"New","Cash","Online","West_David"],
  ["2023-12-09","Eve","North",6500,24,"Electronics",179,308,0.00,"Returning","Credit Card","Online","North_Eve"],
  ["2023-12-11","Alice","South",3900,13,"Furniture",203,418,0.05,"New","Bank Transfer","Retail","South_Alice"],
  ["2023-12-13","Bob","East",2500,8,"Clothing",57,300,0.12,"Returning","Cash","Online","East_Bob"],
  ["2023-12-15","Charlie","West",5400,19,"Electronics",182,315,0.00,"Returning","Credit Card","Online","West_Charlie"],
  ["2023-12-17","David","North",4100,13,"Furniture",199,416,0.05,"New","Bank Transfer","Retail","North_David"],
  ["2023-12-19","Eve","South",2900,9,"Clothing",62,310,0.20,"New","Cash","Online","South_Eve"],
  ["2023-12-21","Alice","East",5200,18,"Electronics",181,312,0.00,"Returning","Credit Card","Online","East_Alice"],
  ["2023-12-23","Bob","West",3400,11,"Furniture",204,422,0.08,"Returning","Bank Transfer","Retail","West_Bob"],
  ["2023-12-26","Charlie","North",2600,8,"Clothing",59,302,0.10,"New","Cash","Online","North_Charlie"],
  ["2023-12-28","David","South",5900,21,"Electronics",178,307,0.00,"Returning","Credit Card","Online","South_David"],
  ["2023-12-30","Eve","East",3200,10,"Furniture",201,415,0.05,"New","Bank Transfer","Retail","East_Eve"],
  // edge-case rows: high discount / low margin
  ["2023-01-30","Alice","North",980,5,"Clothing",60,210,0.25,"New","Cash","Retail","North_Alice"],
  ["2023-02-28","Bob","South",1100,4,"Furniture",210,290,0.22,"New","Cash","Retail","South_Bob"],
  ["2023-03-31","Charlie","East",750,3,"Clothing",55,260,0.28,"New","Cash","Retail","East_Charlie"],
  ["2023-04-30","David","West",620,2,"Furniture",205,330,0.30,"New","Cash","Retail","West_David"],
  ["2023-05-31","Eve","North",830,4,"Clothing",58,225,0.22,"New","Cash","Retail","North_Eve"],
  ["2023-06-30","Alice","South",920,5,"Furniture",208,290,0.25,"New","Bank Transfer","Retail","South_Alice"],
  ["2023-07-31","Bob","East",870,4,"Clothing",62,235,0.23,"New","Cash","Retail","East_Bob"],
  ["2023-08-31","Charlie","West",1050,5,"Furniture",202,285,0.24,"New","Bank Transfer","Retail","West_Charlie"],
  ["2023-09-30","David","North",760,3,"Clothing",56,260,0.28,"New","Cash","Retail","North_David"],
  ["2023-10-31","Eve","South",940,4,"Furniture",206,298,0.22,"New","Cash","Retail","South_Eve"],
  ["2023-11-30","Alice","East",810,4,"Clothing",59,230,0.26,"New","Cash","Retail","East_Alice"],
  ["2023-12-31","Bob","West",1200,5,"Furniture",198,285,0.21,"New","Bank Transfer","Retail","West_Bob"],
  // large orders
  ["2023-02-14","Charlie","North",7800,25,"Electronics",185,335,0.00,"Returning","Credit Card","Online","North_Charlie"],
  ["2023-05-15","David","South",8200,28,"Electronics",182,310,0.00,"Returning","Credit Card","Online","South_David"],
  ["2023-08-20","Eve","East",7500,26,"Electronics",179,312,0.00,"Returning","Credit Card","Online","East_Eve"],
  ["2023-11-10","Alice","West",8900,30,"Electronics",184,318,0.00,"Returning","Credit Card","Online","West_Alice"],
  ["2023-03-15","Bob","North",6800,24,"Electronics",181,315,0.00,"Returning","Credit Card","Online","North_Bob"],
  ["2023-06-20","Charlie","South",7200,25,"Electronics",180,311,0.00,"Returning","Credit Card","Online","South_Charlie"],
  ["2023-09-22","David","East",5600,20,"Furniture",198,412,0.03,"Returning","Bank Transfer","Retail","East_David"],
  ["2023-12-14","Eve","West",6300,22,"Furniture",203,418,0.00,"Returning","Bank Transfer","Online","West_Eve"],
  ["2023-04-10","Alice","North",4800,16,"Clothing",58,315,0.00,"Returning","Credit Card","Online","North_Alice"],
  ["2023-07-15","Bob","South",5200,17,"Clothing",62,325,0.00,"Returning","Credit Card","Online","South_Bob"],
  ["2023-10-18","Charlie","East",4600,15,"Clothing",55,320,0.00,"Returning","Credit Card","Online","East_Charlie"],
  ["2023-01-15","David","West",3800,13,"Clothing",60,308,0.00,"Returning","Credit Card","Online","West_David"],
  ["2023-03-25","Eve","North",2950,9,"Furniture",200,425,0.10,"New","Bank Transfer","Online","North_Eve"],
  ["2023-06-12","Alice","South",3200,10,"Furniture",205,418,0.08,"Returning","Bank Transfer","Online","South_Alice"],
  ["2023-09-08","Bob","East",4100,13,"Electronics",183,320,0.05,"New","Credit Card","Retail","East_Bob"],
  ["2023-11-04","Charlie","West",3750,12,"Electronics",178,315,0.05,"New","Credit Card","Retail","West_Charlie"],
  ["2023-07-22","David","North",1800,6,"Clothing",56,310,0.25,"New","Cash","Retail","North_David"],
  ["2023-10-05","Eve","South",1650,5,"Furniture",210,350,0.28,"New","Cash","Retail","South_Eve"],
];

const MOCK_COLS = [
  "Sale_Date","Sales_Rep","Region","Sales_Amount","Quantity_Sold",
  "Product_Category","Unit_Cost","Unit_Price","Customer_Type",
  "Discount","Payment_Method","Sales_Channel","Region_and_Sales_Rep"
];

function buildMockObjects() {
  return MOCK_ROWS.map((r, i) => {
    const obj = { _id: i };
    MOCK_COLS.forEach((c, ci) => { obj[c] = r[ci]; });
    return obj;
  });
}

/* ══════════════════════════════════════════════════════════════
   2.  PARSE & ENRICH
══════════════════════════════════════════════════════════════ */
const MONTHS_ID = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

function enrichRow(obj, idx) {
  const d = { ...obj, _id: idx };
  d.Sale_Date       = d.Sale_Date instanceof Date ? d.Sale_Date : new Date(d.Sale_Date);
  d.month           = isNaN(d.Sale_Date) ? 0 : d.Sale_Date.getMonth();
  d.Quantity_Sold   = +d.Quantity_Sold  || 0;
  d.Unit_Price      = +d.Unit_Price     || 0;
  d.Unit_Cost       = +d.Unit_Cost      || 0;
  d.Discount        = +d.Discount       || 0;
  d.Sales_Amount    = +d.Sales_Amount   || 0;

  // Formulas per spec
  d.Revenue         = d.Quantity_Sold * d.Unit_Price * (1 - d.Discount);
  d.netProfit       = d.Quantity_Sold * (d.Unit_Price * (1 - d.Discount) - d.Unit_Cost);
  d.profitMargin    = d.Revenue > 0 ? (d.netProfit / d.Revenue) * 100 : 0;
  return d;
}

function parseObjects(rawObjs) {
  return rawObjs.map(enrichRow);
}

/* ══════════════════════════════════════════════════════════════
   3.  STATE
══════════════════════════════════════════════════════════════ */
let ALL_DATA    = [];
let isMock      = true;
let filters     = { Region:'', Channel:'', Category:'', Customer:'' };
let sortCol     = 'Sale_Date';
let sortDir     = -1;  // -1 = descending
let currentPage = 1;
let tableSearch = '';
let tableFiltered = [];

const PAGE_SIZE = 15;

/* ══════════════════════════════════════════════════════════════
   4.  IDR FORMAT HELPERS
══════════════════════════════════════════════════════════════ */
// Full: "Rp 12.500.000"
function fmtIDR(v) {
  return 'Rp\u00A0' + Math.round(v).toLocaleString('id-ID');
}
// Short KPI: "Rp 12,5 Jt" / "Rp 1,2 M"
function fmtIDRShort(v) {
  if (Math.abs(v) >= 1_000_000_000) return 'Rp\u00A0' + (v/1_000_000_000).toLocaleString('id-ID',{maximumFractionDigits:1}) + '\u00A0M';
  if (Math.abs(v) >= 1_000_000)     return 'Rp\u00A0' + (v/1_000_000).toLocaleString('id-ID',{maximumFractionDigits:1}) + '\u00A0Jt';
  if (Math.abs(v) >= 1_000)         return 'Rp\u00A0' + (v/1_000).toLocaleString('id-ID',{maximumFractionDigits:1}) + '\u00A0Rb';
  return fmtIDR(v);
}
function fmtPct(v) { return v.toFixed(1) + '%'; }

/* ══════════════════════════════════════════════════════════════
   5.  TOAST
══════════════════════════════════════════════════════════════ */
let _toastTimer = null;
function toast(msg, type='ok') {
  const el = document.getElementById('toast');
  const colors = { ok:'#10B981', warn:'#F59E0B', err:'#EF4444' };
  el.style.borderColor = colors[type] || colors.ok;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* ══════════════════════════════════════════════════════════════
   6.  LOAD DATA (mock or imported)
══════════════════════════════════════════════════════════════ */
function loadMock() {
  ALL_DATA = parseObjects(buildMockObjects());
  isMock = true;
  document.getElementById('dataSourceBadge').textContent = '📋 Data Contoh';
  rebuildFilters();
  render();
  toast('Data contoh dimuat — ' + ALL_DATA.length + ' transaksi', 'ok');
}

function loadImported(objects, filename) {
  ALL_DATA = parseObjects(objects.map((o,i) => ({ ...o, _id:i })));
  isMock = false;
  document.getElementById('dataSourceBadge').textContent = '📂 ' + filename;
  rebuildFilters();
  render();
  toast('✅ Berhasil memuat ' + ALL_DATA.length + ' baris dari ' + filename, 'ok');
  document.getElementById('dropSection').classList.add('hidden');
}

/* ══════════════════════════════════════════════════════════════
   7.  CSV / JSON FILE IMPORT (PapaParse)
══════════════════════════════════════════════════════════════ */
function handleFile(file) {
  if (!file) return;
  const ext = file.name.split('.').pop().toLowerCase();
  if (ext === 'json') {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result);
        const rows = Array.isArray(parsed) ? parsed : parsed.data || parsed.rows || [];
        if (!rows.length) { toast('File JSON kosong atau format tidak dikenali.', 'err'); return; }
        loadImported(rows, file.name);
      } catch { toast('Gagal membaca JSON: format tidak valid.', 'err'); }
    };
    reader.readAsText(file);
  } else if (ext === 'csv') {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: result => {
        if (!result.data.length) { toast('File CSV kosong.', 'err'); return; }
        loadImported(result.data, file.name);
      },
      error: () => toast('Gagal membaca CSV.', 'err')
    });
  } else {
    toast('Format tidak didukung. Gunakan .csv atau .json', 'warn');
  }
}

/* ══════════════════════════════════════════════════════════════
   8.  EXPORT  (filtered data)
══════════════════════════════════════════════════════════════ */
function getExportRows() {
  const data = applyFilters();
  return data.map(d => ({
    Sale_Date:            d.Sale_Date instanceof Date ? d.Sale_Date.toISOString().slice(0,10) : d.Sale_Date,
    Sales_Rep:            d.Sales_Rep,
    Region:               d.Region,
    Sales_Amount:         d.Sales_Amount,
    Quantity_Sold:        d.Quantity_Sold,
    Product_Category:     d.Product_Category,
    Unit_Cost:            d.Unit_Cost,
    Unit_Price:           d.Unit_Price,
    Customer_Type:        d.Customer_Type,
    Discount:             d.Discount,
    Payment_Method:       d.Payment_Method,
    Sales_Channel:        d.Sales_Channel,
    Region_and_Sales_Rep: d.Region_and_Sales_Rep || (d.Region + '_' + d.Sales_Rep),
    Revenue_IDR:          Math.round(d.Revenue),
    Net_Profit_IDR:       Math.round(d.netProfit),
    Profit_Margin_Pct:    +d.profitMargin.toFixed(2),
  }));
}

function exportCSV() {
  const rows = getExportRows();
  const csv = Papa.unparse(rows);
  downloadBlob(csv, 'revenuescope_export.csv', 'text/csv;charset=utf-8;');
  toast('✅ Ekspor CSV berhasil (' + rows.length + ' baris)', 'ok');
}

function exportJSON() {
  const rows = getExportRows();
  const json = JSON.stringify(rows, null, 2);
  downloadBlob(json, 'revenuescope_export.json', 'application/json');
  toast('✅ Ekspor JSON berhasil (' + rows.length + ' baris)', 'ok');
}

function downloadBlob(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ══════════════════════════════════════════════════════════════
   9.  FILTER DROPDOWNS
══════════════════════════════════════════════════════════════ */
function rebuildFilters() {
  const unique = key => [...new Set(ALL_DATA.map(d => d[key]).filter(Boolean))].sort();
  const fillSel = (id, vals) => {
    const sel = document.getElementById(id);
    const cur = sel.value;
    // keep first placeholder option, remove rest
    while (sel.options.length > 1) sel.remove(1);
    vals.forEach(v => { const o = new Option(v, v); sel.appendChild(o); });
    if (vals.includes(cur)) sel.value = cur; else sel.value = '';
  };
  fillSel('fRegion',   unique('Region'));
  fillSel('fChannel',  unique('Sales_Channel'));
  fillSel('fCategory', unique('Product_Category'));
  fillSel('fCustomer', unique('Customer_Type'));
}

function applyFilters() {
  return ALL_DATA.filter(d =>
    (!filters.Region   || d.Region           === filters.Region)   &&
    (!filters.Channel  || d.Sales_Channel    === filters.Channel)  &&
    (!filters.Category || d.Product_Category === filters.Category) &&
    (!filters.Customer || d.Customer_Type    === filters.Customer)
  );
}

/* ══════════════════════════════════════════════════════════════
   10.  KPI CARDS
══════════════════════════════════════════════════════════════ */
function renderKPIs(data) {
  const totalRev   = data.reduce((s,d) => s + d.Revenue, 0);
  const totalProf  = data.reduce((s,d) => s + d.netProfit, 0);
  const avgDisc    = data.length ? data.reduce((s,d) => s + d.Discount, 0) / data.length : 0;
  const margin     = totalRev > 0 ? (totalProf / totalRev) * 100 : 0;

  const repRev = {}, catRev = {};
  data.forEach(d => {
    repRev[d.Sales_Rep] = (repRev[d.Sales_Rep]||0) + d.Revenue;
    catRev[d.Product_Category] = (catRev[d.Product_Category]||0) + d.Revenue;
  });
  const topRep = Object.entries(repRev).sort((a,b)=>b[1]-a[1])[0] || ['—',0];
  const topCat = Object.entries(catRev).sort((a,b)=>b[1]-a[1])[0] || ['—',0];

  const n = Math.max(data.length, 1);
  document.getElementById('kpiRevenue').textContent    = fmtIDRShort(totalRev);
  document.getElementById('kpiRevenueAvg').textContent = `Rata-rata/txn: ${fmtIDRShort(totalRev/n)} · ${data.length} transaksi`;
  document.getElementById('kpiProfit').textContent     = fmtIDRShort(totalProf);
  document.getElementById('kpiMargin').textContent     = `Margin bersih: ${fmtPct(margin)} · ${fmtIDRShort(totalProf/n)}/txn`;
  document.getElementById('kpiDiscount').textContent   = fmtPct(avgDisc * 100);
  const highDisc = data.filter(d=>d.Discount>0.20).length;
  document.getElementById('kpiDiscountSub').textContent = `${highDisc} transaksi dengan diskon >20%`;
  document.getElementById('kpiTopRep').innerHTML = `<span class="text-emerald">${topRep[0]}</span>`;
  document.getElementById('kpiTopCat').textContent = `${topCat[0]} · ${fmtIDRShort(topCat[1])}`;
  document.getElementById('filteredCount').textContent = `${data.length} / ${ALL_DATA.length} baris`;
}

/* ══════════════════════════════════════════════════════════════
   11.  MONTHLY TREND CHART
══════════════════════════════════════════════════════════════ */
let trendChart = null;
function renderTrendChart(data) {
  const rev  = Array(12).fill(0);
  const prof = Array(12).fill(0);
  data.forEach(d => { rev[d.month] += d.Revenue; prof[d.month] += d.netProfit; });

  const ctx = document.getElementById('trendChart').getContext('2d');
  if (trendChart) {
    trendChart.data.datasets[0].data = rev;
    trendChart.data.datasets[1].data = prof;
    trendChart.update('active'); return;
  }
  trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: MONTHS_ID,
      datasets: [
        { label:'Pendapatan', data:rev,  borderColor:'#10B981', backgroundColor:'rgba(16,185,129,0.08)',
          borderWidth:2.5, pointRadius:4, pointHoverRadius:6, pointBackgroundColor:'#10B981', tension:0.4, fill:true },
        { label:'Keuntungan', data:prof, borderColor:'#F59E0B', backgroundColor:'rgba(245,158,11,0.06)',
          borderWidth:2,   pointRadius:3.5, pointHoverRadius:5, pointBackgroundColor:'#F59E0B', tension:0.4, fill:true, borderDash:[5,4] },
      ]
    },
    options: {
      responsive:true, maintainAspectRatio:false,
      interaction:{ mode:'index', intersect:false },
      plugins:{
        legend:{ display:false },
        tooltip:{
          backgroundColor:'#1A2234', borderColor:'#1F2D42', borderWidth:1,
          titleColor:'#8898AA', bodyColor:'#E2E8F0', padding:10,
          titleFont:{family:'Plus Jakarta Sans'}, bodyFont:{family:'Plus Jakarta Sans'},
          callbacks:{ label: ctx => ` ${ctx.dataset.label}: ${fmtIDR(ctx.raw)}` }
        }
      },
      scales:{
        x:{ grid:{ color:'rgba(31,45,66,0.6)' }, ticks:{ color:'#8898AA', font:{family:'Plus Jakarta Sans',size:11} } },
        y:{ grid:{ color:'rgba(31,45,66,0.6)' }, border:{ dash:[4,4] },
            ticks:{ color:'#8898AA', font:{family:'Plus Jakarta Sans',size:11}, callback: v => fmtIDRShort(v) } }
      }
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   12.  SALES REP LEADERBOARD
══════════════════════════════════════════════════════════════ */
let repChart = null;
function renderRepChart(data) {
  const reps = ['Alice','Bob','Charlie','David','Eve'];
  const revMap = {}, profMap = {};
  reps.forEach(r => { revMap[r]=0; profMap[r]=0; });
  data.forEach(d => {
    if (revMap[d.Sales_Rep] !== undefined) {
      revMap[d.Sales_Rep]  += d.Revenue;
      profMap[d.Sales_Rep] += d.netProfit;
    }
  });
  const sorted = reps.map(r=>({r, rev:revMap[r], prof:profMap[r]})).sort((a,b)=>b.rev-a.rev);

  const ctx = document.getElementById('repChart').getContext('2d');
  if (repChart) {
    repChart.data.labels           = sorted.map(x=>x.r);
    repChart.data.datasets[0].data = sorted.map(x=>x.rev);
    repChart.data.datasets[1].data = sorted.map(x=>x.prof);
    repChart.update('active'); return;
  }
  repChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(x=>x.r),
      datasets:[
        { label:'Pendapatan',  data:sorted.map(x=>x.rev),  backgroundColor:'rgba(16,185,129,0.7)', borderRadius:5, borderSkipped:false },
        { label:'Keuntungan',  data:sorted.map(x=>x.prof), backgroundColor:'rgba(245,158,11,0.65)', borderRadius:5, borderSkipped:false },
      ]
    },
    options:{
      indexAxis:'y', responsive:true, maintainAspectRatio:false,
      interaction:{ mode:'index', intersect:false },
      plugins:{
        legend:{ display:false },
        tooltip:{
          backgroundColor:'#1A2234', borderColor:'#1F2D42', borderWidth:1,
          titleColor:'#8898AA', bodyColor:'#E2E8F0', padding:10,
          titleFont:{family:'Plus Jakarta Sans'}, bodyFont:{family:'Plus Jakarta Sans'},
          callbacks:{ label: ctx => ` ${ctx.dataset.label}: ${fmtIDR(ctx.raw)}` }
        }
      },
      scales:{
        x:{ grid:{ color:'rgba(31,45,66,0.6)' }, border:{ dash:[4,4] },
            ticks:{ color:'#8898AA', font:{family:'Plus Jakarta Sans',size:10}, callback: v => fmtIDRShort(v) } },
        y:{ grid:{ display:false }, ticks:{ color:'#E2E8F0', font:{family:'Plus Jakarta Sans',size:12,weight:'600'} } }
      }
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   13.  DOUGHNUT HELPER
══════════════════════════════════════════════════════════════ */
const PALETTE = ['#10B981','#F59E0B','#6366F1','#EC4899','#3B82F6','#14B8A6','#F97316'];

function makeDoughnut(canvasId, labels, values, colors) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  return new Chart(ctx, {
    type:'doughnut',
    data:{
      labels, datasets:[{
        data: values, backgroundColor: colors,
        borderColor:'#151C28', borderWidth:3, hoverOffset:6
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:true, cutout:'65%',
      plugins:{
        legend:{ display:false },
        tooltip:{
          backgroundColor:'#1A2234', borderColor:'#1F2D42', borderWidth:1,
          titleColor:'#8898AA', bodyColor:'#E2E8F0', padding:10,
          titleFont:{family:'Plus Jakarta Sans'}, bodyFont:{family:'Plus Jakarta Sans'},
          callbacks:{
            label: ctx => {
              const tot = ctx.dataset.data.reduce((a,b)=>a+b,0);
              return ` ${ctx.label}: ${fmtIDR(ctx.raw)} (${fmtPct(tot?ctx.raw/tot*100:0)})`;
            }
          }
        }
      }
    }
  });
}

function updateDoughnut(chart, labels, values) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = values;
  chart.update('active');
}

function renderLegend(containerId, labels, values, colors) {
  const total = values.reduce((a,b)=>a+b,0)||1;
  document.getElementById(containerId).innerHTML = labels.map((l,i) =>
    `<div class="flex items-center justify-between">
       <span class="flex items-center gap-1.5 text-xs text-text">
         <span style="width:8px;height:8px;border-radius:2px;background:${colors[i%colors.length]};display:inline-block;"></span>${l}
       </span>
       <span class="text-xs font-semibold text-muted">${fmtPct(values[i]/total*100)}</span>
     </div>`
  ).join('');
}

let categoryChart = null, channelChart = null, paymentChart = null;

function renderDoughnuts(data) {
  // Category
  const catAgg = {};
  data.forEach(d => { catAgg[d.Product_Category] = (catAgg[d.Product_Category]||0) + d.Revenue; });
  const catL = Object.keys(catAgg), catV = catL.map(k=>catAgg[k]);

  if (categoryChart) updateDoughnut(categoryChart, catL, catV);
  else categoryChart = makeDoughnut('categoryChart', catL, catV, PALETTE);
  renderLegend('categoryLegend', catL, catV, PALETTE);

  // Channel
  const chanAgg = {};
  data.forEach(d => { chanAgg[d.Sales_Channel] = (chanAgg[d.Sales_Channel]||0) + d.Revenue; });
  const chanL = Object.keys(chanAgg), chanV = chanL.map(k=>chanAgg[k]);

  if (channelChart) updateDoughnut(channelChart, chanL, chanV);
  else channelChart = makeDoughnut('channelChart', chanL, chanV, [PALETTE[0],PALETTE[1]]);
  renderLegend('channelLegend', chanL, chanV, [PALETTE[0],PALETTE[1]]);

  // Payment
  const payAgg = {};
  data.forEach(d => { payAgg[d.Payment_Method] = (payAgg[d.Payment_Method]||0) + d.Revenue; });
  const payL = Object.keys(payAgg), payV = payL.map(k=>payAgg[k]);
  const payColors = [PALETTE[2],PALETTE[0],PALETTE[1]];

  if (paymentChart) updateDoughnut(paymentChart, payL, payV);
  else paymentChart = makeDoughnut('paymentChart', payL, payV, payColors);
  renderLegend('paymentLegend', payL, payV, payColors);
}

/* ══════════════════════════════════════════════════════════════
   14.  CUSTOMER SEGMENT BARS
══════════════════════════════════════════════════════════════ */
function renderSegmentBars(data) {
  const seg = {};
  data.forEach(d => { seg[d.Customer_Type] = (seg[d.Customer_Type]||0) + d.Revenue; });
  const total = Object.values(seg).reduce((a,b)=>a+b,0)||1;
  const colors = { New:'#F59E0B', Returning:'#10B981' };
  const cont = document.getElementById('segmentBars');
  cont.innerHTML = Object.entries(seg).sort((a,b)=>b[1]-a[1]).map(([type,val]) => {
    const pct = val/total*100;
    return `<div>
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-xs font-semibold" style="color:${colors[type]||'#E2E8F0'}">${type}</span>
        <span class="text-xs text-muted">${fmtIDR(val)} · ${fmtPct(pct)}</span>
      </div>
      <div class="rounded-full overflow-hidden" style="height:8px;background:#1F2D42;">
        <div style="width:${pct}%;height:100%;background:${colors[type]||'#6366F1'};border-radius:99px;transition:width 0.4s ease;"></div>
      </div>
    </div>`;
  }).join('') || '<p class="text-xs text-muted">Tidak ada data</p>';
}

/* ══════════════════════════════════════════════════════════════
   15.  AUDIT TABLE
══════════════════════════════════════════════════════════════ */
function riskBadge(d) {
  const hd = d.Discount > 0.20, lm = d.profitMargin < 5;
  if (hd && lm) return '<span class="badge-danger">RISIKO TINGGI</span>';
  if (hd || lm) return '<span class="badge-amber">PERHATIAN</span>';
  return '<span class="badge-ok">SEHAT</span>';
}

function renderTable() {
  const body  = document.getElementById('auditBody');
  const start = (currentPage-1) * PAGE_SIZE;
  const page  = tableFiltered.slice(start, start + PAGE_SIZE);

  body.innerHTML = page.map(d => {
    const dateStr     = d.Sale_Date instanceof Date && !isNaN(d.Sale_Date) ? d.Sale_Date.toISOString().slice(0,10) : String(d.Sale_Date).slice(0,10);
    const marginClr   = d.profitMargin < 5 ? '#EF4444' : d.profitMargin < 15 ? '#F59E0B' : '#10B981';
    const discClr     = d.Discount > 0.20 ? '#EF4444' : d.Discount > 0.10 ? '#F59E0B' : '#8898AA';
    const profitClr   = d.netProfit < 0 ? '#EF4444' : '#10B981';
    return `<tr>
      <td>${dateStr}</td>
      <td class="font-semibold">${d.Sales_Rep}</td>
      <td>${d.Region}</td>
      <td>${d.Product_Category}</td>
      <td>${d.Sales_Channel}</td>
      <td>${d.Customer_Type}</td>
      <td>${d.Payment_Method}</td>
      <td class="text-right font-mono">${fmtIDR(d.Revenue)}</td>
      <td class="text-right font-mono" style="color:${profitClr}">${fmtIDR(d.netProfit)}</td>
      <td class="text-right font-mono" style="color:${marginClr}">${fmtPct(d.profitMargin)}</td>
      <td class="text-right font-mono" style="color:${discClr}">${fmtPct(d.Discount*100)}</td>
      <td>${riskBadge(d)}</td>
    </tr>`;
  }).join('');

  const tot  = tableFiltered.length;
  const totP = Math.ceil(tot / PAGE_SIZE) || 1;
  document.getElementById('pgInfo').textContent       = `Halaman ${currentPage} / ${totP}  (${tot} baris)`;
  document.getElementById('pgPrev').disabled          = currentPage === 1;
  document.getElementById('pgNext').disabled          = currentPage >= totP;
  document.getElementById('tableCountLabel').textContent = `${tot} hasil`;
}

function sortAndFilter() {
  const q = tableSearch.toLowerCase();
  const base = applyFilters();
  tableFiltered = base.filter(d =>
    !q ||
    String(d.Sales_Rep).toLowerCase().includes(q)        ||
    String(d.Region).toLowerCase().includes(q)           ||
    String(d.Product_Category).toLowerCase().includes(q) ||
    String(d.Sales_Channel).toLowerCase().includes(q)    ||
    String(d.Customer_Type).toLowerCase().includes(q)    ||
    String(d.Payment_Method).toLowerCase().includes(q)
  );
  tableFiltered.sort((a,b) => {
    let av = a[sortCol], bv = b[sortCol];
    if (sortCol === 'Sale_Date') { av = av instanceof Date ? av.getTime() : new Date(av).getTime(); bv = bv instanceof Date ? bv.getTime() : new Date(bv).getTime(); }
    if (typeof av === 'string') return sortDir * av.localeCompare(bv);
    return sortDir * (av - bv);
  });
  currentPage = 1;
  renderTable();
}

/* ══════════════════════════════════════════════════════════════
   16.  MASTER RENDER
══════════════════════════════════════════════════════════════ */
function render() {
  const data = applyFilters();
  renderKPIs(data);
  renderTrendChart(data);
  renderRepChart(data);
  renderDoughnuts(data);
  renderSegmentBars(data);
  sortAndFilter(); // uses applyFilters() internally for table
}

/* ══════════════════════════════════════════════════════════════
   17.  EVENT BINDINGS
══════════════════════════════════════════════════════════════ */
// Filters
document.getElementById('fRegion').addEventListener('change',   e => { filters.Region   = e.target.value; render(); });
document.getElementById('fChannel').addEventListener('change',  e => { filters.Channel  = e.target.value; render(); });
document.getElementById('fCategory').addEventListener('change', e => { filters.Category = e.target.value; render(); });
document.getElementById('fCustomer').addEventListener('change', e => { filters.Customer = e.target.value; render(); });
document.getElementById('resetFilters').addEventListener('click', () => {
  filters = { Region:'', Channel:'', Category:'', Customer:'' };
  ['fRegion','fChannel','fCategory','fCustomer'].forEach(id => { document.getElementById(id).value = ''; });
  render();
});

// Table search & sort
document.getElementById('tableSearchInput').addEventListener('input', e => { tableSearch = e.target.value; sortAndFilter(); });
document.getElementById('pgPrev').addEventListener('click', () => { if (currentPage>1) { currentPage--; renderTable(); } });
document.getElementById('pgNext').addEventListener('click', () => {
  const tp = Math.ceil(tableFiltered.length / PAGE_SIZE);
  if (currentPage < tp) { currentPage++; renderTable(); }
});
document.querySelectorAll('thead th.sort-btn').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) sortDir *= -1; else { sortCol = col; sortDir = -1; }
    sortAndFilter();
  });
});

// Import button → file picker
document.getElementById('btnImport').addEventListener('click', () => {
  document.getElementById('dropSection').classList.toggle('hidden');
  document.getElementById('fileInput').click();
});
document.getElementById('fileInput').addEventListener('change', e => {
  if (e.target.files[0]) handleFile(e.target.files[0]);
  e.target.value = '';
});

// Drag & Drop
const dropZone = document.getElementById('dropZone');
['dragenter','dragover'].forEach(ev => dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.add('drag-over'); }));
['dragleave','drop'].forEach(ev => dropZone.addEventListener(ev, e => { e.preventDefault(); dropZone.classList.remove('drag-over'); }));
dropZone.addEventListener('drop', e => {
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});
dropZone.addEventListener('click', () => document.getElementById('fileInput').click());

// Body-level drag-over (allow drop anywhere on page)
document.body.addEventListener('dragover', e => e.preventDefault());
document.body.addEventListener('drop', e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) handleFile(file);
});

// Export
document.getElementById('btnExportCSV').addEventListener('click', exportCSV);
document.getElementById('btnExportJSON').addEventListener('click', exportJSON);

// Print / PDF
document.getElementById('btnPrint').addEventListener('click', () => {
  document.getElementById('printDate').textContent = new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
  window.print();
});

/* ══════════════════════════════════════════════════════════════
   18.  INIT
══════════════════════════════════════════════════════════════ */
document.getElementById('lastUpdated').textContent = new Date().toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});
loadMock();
