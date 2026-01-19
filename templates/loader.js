let globalStyles = "";
class TemplateLoader {
  static async load(templateName, targetSelector) {
    try {
      const response = await fetch(`templates/${templateName}.html`);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const styleElement = doc.querySelector("style");
      let cssContent = "";

      if (styleElement) {
        let globalStyleElement = document.getElementById("global-styles");

        if (!globalStyleElement) {
          globalStyleElement = document.createElement("style");
          globalStyleElement.id = "global-styles";
          document.head.appendChild(globalStyleElement);
        }

        cssContent = styleElement.textContent || styleElement.innerHTML;
        console.log(cssContent);

        globalStyles += cssContent + "\n";
        globalStyleElement.textContent = globalStyles;

        styleElement.remove();
      }

      const remainingHTML = doc.body.innerHTML;

      const targets = document.querySelectorAll(targetSelector);
      targets.forEach((target) => {
        target.outerHTML = remainingHTML;

        target.querySelectorAll("script").forEach((oldScript) => {
          const newScript = document.createElement("script");
          newScript.textContent = oldScript.textContent;
          if (oldScript.src) newScript.src = oldScript.src;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
      });
    } catch (error) {
      console.error(`Failed to load template ${templateName}:`, error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[template]").forEach(async (element) => {
    const templateName = element.getAttribute("template");
    await TemplateLoader.load(templateName, `[template="${templateName}"]`);
  });
});
