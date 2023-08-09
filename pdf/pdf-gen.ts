const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const data = {
    title: 'A new Brazilian School',
    date: '05/12/2018',
    name: 'NR',
    age: 28,
    birthdate: '12/07/1990',
    course: 'Computer Science',
    obs: 'Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.',
};

const main = async () => {
    const templateHtml = fs.readFileSync(
        path.join(__dirname, 'templates', 'template1.html'),
        'utf8',
    );
    const template = handlebars.compile(templateHtml);
    const html = template(data);
    fs.writeFileSync(path.join(__dirname, 'output.html'), html);

    const pdfPath = path.join(
        __dirname,
        'output',
        `${data.name}-${new Date().getTime()}.pdf`,
    );

    const options = {
        // width: '1230px',
        headerTemplate: '<p>Header</p>',
        footerTemplate: '<p>Footer</p>',
        format: 'A4',
        displayHeaderFooter: false,
        margin: {
            top: '1cm',
            bottom: '1cm',
            left: '1cm',
            right: '1cm',
        },
        printBackground: true,
        path: pdfPath,
    };

    // launch a new chrome instance
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: 'new',
    });

    // create a new page
    const page = await browser.newPage();

    // set your html as the pages content
    await page.setContent(html, {
        waitUntil: 'domcontentloaded',
    });

    // await page.goto(`data:text/html;charset=UTF-8,${html}`, {
    //     waitUntil: 'networkidle0',
    // });

    await page.addStyleTag({
        path: path.join(__dirname, 'templates', 'styles', 'style.css'),
    });

    await page.addStyleTag({
        path: path.join(__dirname, 'templates', 'styles', 'font.css'),
    });

    // create a pdf buffer
    // const pdfBuffer = await page.pdf({
    //     format: 'A4',
    // });

    // or a .pdf file
    await page.pdf(options);

    // close the browser
    await browser.close();
};

main();
