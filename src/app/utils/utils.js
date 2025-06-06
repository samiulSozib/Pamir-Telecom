import { differenceInSeconds } from "date-fns";

export const convertHexToRGB = (hex) => {
  // check if it's a rgba
  if (hex.match("rgba")) {
    let triplet = hex.slice(5).split(",").slice(0, -1).join(",");
    return triplet;
  }

  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
  }
};

function currentYPosition(elm) {
  if (!window && !elm) return;

  if (elm) return elm.scrollTop;
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);

  if (!elmID || !elm) {
    return;
  }

  var startY = currentYPosition(scrollableElement);
  var stopY = elmYPosition(elm);

  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference = differenceInSeconds(new Date(), date);

  if (difference < 60) return `${Math.floor(difference)} sec`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} min`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} h`;
  else if (difference < 86400 * 30) return `${Math.floor(difference / 86400)} d`;
  else if (difference < 86400 * 30 * 12) return `${Math.floor(difference / 86400 / 30)} mon`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} y`;
}


export function categorizeServices(data) {
  const categorized = {
    nonsocial: {},
    social: {}
  };

  // Sets to track seen companies for social and nonsocial services
  const seenSocialCompanies = new Set();
  const seenNonSocialCompanies = new Set();

  data.forEach(category => {
    const type = category.type;
    const categoryId = category.id;
    const categoryName = category.category_name;

    category.services.forEach(service => {
      const country = service.company?.country?.country_name;
      const countryId = service.company?.country_id
      const countryImage = service.company?.country?.country_flag_image_url;
      const companyId = service.company?.id;
      let companyLogo;

      if (type === "social") {
        companyLogo = service.company.company_logo;

        // Check for duplicate social companies
        if (!seenSocialCompanies.has(companyId)) {
          seenSocialCompanies.add(companyId);

          // Initialize social category if it doesn't exist
          if (!categorized.social[categoryName]) {
            categorized.social[categoryName] = {
              companies: []
            };
          }

          const socialCompanyInfo = {
            companyId: companyId,
            companyName: service.company.company_name,
            companyLogo: companyLogo,
            categoryId: categoryId,
            categoryName: categoryName,
            countryId: countryId
          };

          categorized.social[categoryName].companies.push(socialCompanyInfo);
        }
      } else {
        // Check for duplicate non-social companies
        
          seenNonSocialCompanies.add(companyId);

          // Initialize non-social category for country if it doesn't exist
          if (!categorized.nonsocial[country]) {
            categorized.nonsocial[country] = {
              country_id: countryId,
              countryImage: countryImage,
              categories: {}, // Change to an object for categories keyed by categoryId
              //companies: []
            };
          }

          // Add unique category name and ID if not already in the list for the country
          if (!categorized.nonsocial[country].categories[categoryId]) {
            categorized.nonsocial[country].categories[categoryId] = {
              categoryName: categoryName,
              companies: [] // Hold unique companies for this category
            };
          }

          const nonSocialCompanyInfo = {
            companyId: companyId,
            companyName: service?.company?.company_name||'',
            companycodes:service?.company?.companycodes||''
          };

          // Add company info to the respective category
          categorized.nonsocial[country].categories[categoryId].companies.push(nonSocialCompanyInfo);

          // // Also push company info to the main country companies list if not already added
          //categorized.nonsocial[country].companies.push(nonSocialCompanyInfo);
        
      }
    });
  });

  for (const country in categorized.nonsocial) {
    const categoriesObject = categorized.nonsocial[country].categories;
    // Convert the categories object into an array
    categorized.nonsocial[country].categories = Object.keys(categoriesObject).map(categoryId => ({
      categoryId: categoryId,
      ...categoriesObject[categoryId]
    }));
  }
  //console.log(data)

  return categorized;
}

export function categorizeServices1(data) {
  const nonsocial = {};

  data.forEach(category => {
    const type = category.type;
    const categoryId = category.id;
    const categoryName = category.category_name;

    if (type !== "social") {
      category.services.forEach(service => {
        const country = service.company?.country?.country_name;
        const countryId = service.company?.country_id;
        const countryImage = service.company?.country?.country_flag_image_url;

        if (!nonsocial[country]) {
          nonsocial[country] = {
            country_id: countryId,
            countryImage: countryImage,
            categories: {},
          };
        }

        if (!nonsocial[country].categories[categoryId]) {
          nonsocial[country].categories[categoryId] = {
            categoryName: categoryName,
            country_id: countryId,
            countryImage: countryImage,
          };
        }
      });
    }
  });

  const nonsocialArray = Object.entries(nonsocial || {}).flatMap(([countryName, { country_id: countryId, countryImage, categories }]) => 
    Object.entries(categories).map(([categoryId, { categoryName }]) => ({
      countryName,
      countryId,
      countryImage,
      categoryId,
      categoryName
    }))
  );

  //console.log(nonsocialArray);
  return nonsocialArray;
}




