/*
 * Authored : Sivaraj.V
 * License: MIT (or specify the actual license)
 * Source: https://github.com/sivaraj-v/typestack-validator-chrome-extension
 * Email : zural143@gmail.com
 */

const typestack = {
    "tr-Typestack--h1": {
        fontSize: "44px",
        fontWeight: "500",
        lineHeight: "56px",
        textDecoration : "none solid rgb(26, 26, 26)"
    },
    "tr-Typestack--h2": {
        fontSize: "32px",
        fontWeight: "500",
        lineHeight: "40px",
        textDecoration : "none solid rgb(26, 26, 26)"
    },
    "tr-Typestack--h3": {
        fontSize: "28px",
        fontWeight: "600",
        lineHeight: "36px",
        textDecoration : "none solid rgb(26, 26, 26)"
    },
    "tr-Typestack--h4": {
        fontSize: "24px",
        fontWeight: "600",
        lineHeight: "32px",
        textDecoration : "none solid rgb(26, 26, 26)"
    },
    "tr-Typestack--h5": {
        fontSize: "20px",
        fontWeight: "600",
        lineHeight: "28px",
        textDecoration : "none solid rgb(26, 26, 26)"
    },
    "tr-Typestack--subline1": {
        fontSize: "12px",
        fontWeight: "600",
        lineHeight: "20px",
        textDecoration : "none solid rgb(77, 77, 77)"
    },
    "tr-Typestack--subline2": {
        fontSize: "20px",
        fontWeight: "400",
        lineHeight: "28px",
        textDecoration : "none solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p1": {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "24px",
        textDecoration : "none solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p1Link": {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: "24px",
        textDecoration : "underline solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p1Bold": {
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: "24px",
        textDecoration : "none solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p2": {
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
        textDecoration : "none solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p2Link": {
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "20px",
        textDecoration : "underline solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p2Bold": {
        fontSize: "14px",
        fontWeight: "700",
        lineHeight: "20px",
        textDecoration : "none solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p3": {
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "16px",
        textDecoration : "none solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p3Link": {
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: "16px",
        textDecoration : "underline solid rgb(77, 77, 77)"
    },
    "tr-Typestack--p3Bold": {
        fontSize: "12px",
        fontWeight: "700",
        lineHeight: "16px",
        textDecoration : "none solid rgb(77, 77, 77)"
    }
};
const display = {
    "tr-Typestack--h1": "H1",
    "tr-Typestack--h2": "H2",
    "tr-Typestack--h3": "H3",
    "tr-Typestack--h4": "H4",
    "tr-Typestack--h5": "H5",
    "tr-Typestack--subline1": "S1",
    "tr-Typestack--subline2": "S2",
    "tr-Typestack--p1": "P1",
    "tr-Typestack--p1Link": "P1 Link",
    "tr-Typestack--p1Bold": "P1 Bold",
    "tr-Typestack--p2": "P2",
    "tr-Typestack--p2Link": "P2 Link",
    "tr-Typestack--p2Bold": "P2 Bold",
    "tr-Typestack--p3": "P3",
    "tr-Typestack--p3Link": "P3 Link",
    "tr-Typestack--p3Bold": "P3 Bold"
  };
  


function compareObjects(obj1, obj2) {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}
	
	return true;
}

const iframe = document.querySelector('iframe');


if (iframe) {
    iframe.addEventListener('load', () => {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument) {
            const typestackKeys = Object.keys(typestack);
            const classNamesWithPeriod = typestackKeys.map(className => `.${className}`);
			const DOM_Elements_Joined = iframeDocument.querySelectorAll(`${classNamesWithPeriod.join(",")}`);

			for (const element of DOM_Elements_Joined) {
				const computedStyle = getComputedStyle(element);
				const filteredProperties = [
					'fontSize',
					'fontWeight',
					'lineHeight',
                    "textDecoration"
				];
			
				const filteredStyles = {};
				const filteredElements = {};
			
				for (const property of filteredProperties) {
					filteredStyles[property] = computedStyle[property];
					filteredElements[property] = element.style[property];
				}
				
				const classListArray = Array.from(element.classList);
  				const filteredClassNames = typestackKeys.filter(className => classListArray.includes(className));
				const areEqual = compareObjects(filteredStyles, typestack[filteredClassNames.toString()]);
	
				if (areEqual) {
					const spanElement = document.createElement('span');
					spanElement.textContent = display[filteredClassNames.toString()]
					spanElement.style.backgroundColor = "#003ff4"; 
					spanElement.style.paddingLeft = "5px";
					spanElement.style.paddingRight = "5px"; 
					spanElement.style.display = "inline-block";
					spanElement.style.color = "white"
					spanElement.style.marginRight = "2px"
			
			
					element.insertBefore(spanElement, element.firstChild);
				} else {
					console.log('The style and spec objects are different.');
				}
			}

        } else {
            console.log('Could not access the iframe document.');
        }
    });
} else {
    console.log('No iframe found on the page.');
}


