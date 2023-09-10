/*
 * Authored : Sivaraj.V
 * License: MIT (or specify the actual license)
 * Source: https://github.com/sivaraj-v/typestack-validator-chrome-extension
 * Email : zural143@gmail.com
 */

const DOM_Elements = [".tr-Typestack--h1", ".tr-Typestack--h2", ".tr-Typestack--h3", ".tr-Typestack--h4", ".tr-Typestack--h5", ".tr-Typestack--subline1", ".tr-Typestack--subline2", ".tr-Typestack--p1", ".tr-Typestack--p1Bold", ".tr-Typestack--p2", ".tr-Typestack--p2Bold", ".tr-Typestack--p3", ".tr-Typestack--p3Bold"];
const typestack={".tr-Typestack--h1":{fontSize:"44px",fontWeight:"500",lineHeight:"56px"},".tr-Typestack--h2":{fontSize:"32px",fontWeight:"500",lineHeight:"40px"},".tr-Typestack--h3":{fontSize:"28px",fontWeight:"600",lineHeight:"36px"},".tr-Typestack--h4":{fontSize:"24px",fontWeight:"600",lineHeight:"32px"},".tr-Typestack--h5":{fontSize:"20px",fontWeight:"600",lineHeight:"28px"},".tr-Typestack--subline1":{fontSize:"12px",fontWeight:"600",lineHeight:"20px"},".tr-Typestack--subline2":{fontSize:"20px",fontWeight:"400",lineHeight:"28px"},".tr-Typestack--p1":{fontSize:"16px",fontWeight:"400",lineHeight:"24px"},".tr-Typestack--p1Bold":{fontSize:"16px",fontWeight:"700",lineHeight:"24px"},".tr-Typestack--p2":{fontSize:"14px",fontWeight:"400",lineHeight:"20px"},".tr-Typestack--p2Bold":{fontSize:"14px",fontWeight:"700",lineHeight:"20px"},".tr-Typestack--p3":{fontSize:"12px",fontWeight:"400",lineHeight:"16px"},".tr-Typestack--p3Bold":{fontSize:"12px",fontWeight:"700",lineHeight:"16px"}};
const display={".tr-Typestack--h1":"H1",".tr-Typestack--h2":"H2",".tr-Typestack--h3":"H3",".tr-Typestack--h4":"H4",".tr-Typestack--h5":"H5",".tr-Typestack--subline1":"S1",".tr-Typestack--subline2":"S2",".tr-Typestack--p1":"P1",".tr-Typestack--p1Bold":"P1 Bold",".tr-Typestack--p2":"P2",".tr-Typestack--p2Bold":"P2 Bold",".tr-Typestack--p3":"P1",".tr-Typestack--p3Bold":"P3 Bold"};


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
			const DOM_Elements_Joined = iframeDocument.querySelectorAll(`${DOM_Elements.join(",")}`);
			for (const [index, element] of DOM_Elements_Joined.entries()) {
				const computedStyle = getComputedStyle(element);
				const filteredProperties = [
					'fontSize',
					'fontWeight',
					'lineHeight'
				];
			
				const filteredStyles = {};
				const filteredElements = {};
			
				for (const property of filteredProperties) {
					filteredStyles[property] = computedStyle[property];
				}
				for (const property of filteredProperties) {
					filteredElements[property] = element.style[property];
				}
			
			
				const areEqual = compareObjects(filteredStyles, typestack[DOM_Elements[index]]);
			
				if (areEqual) {
					const spanElement = document.createElement('span');
					spanElement.textContent = display[DOM_Elements[index]]
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


