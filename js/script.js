$(document).ready(function () {

    //ready

    //nojs
    $('body').removeClass('no-js');

    //fakelink
    $('a[href="#"]').on('click', function (event) {
        event.preventDefault();
    });

    $('a.disabled').on('click', function (event) {
        event.preventDefault();
        return false;
    });

    //navigation mobile
    $(document).on('click', '.navigation-toggle-mobile', function (event) {
        event.preventDefault();
        $('body').toggleClass('navigation-open');
    });

    //-----------------------------------------//

    //navigation sidebar
    $(document).on('click', '.sidebar-navigation-drop', function (event) {
        event.preventDefault();
        $(this).parents('li').toggleClass('opened');
    });

    //-----------------------------------------//

    tippy('.note-icon', {
        content: `<div class="leads-table-notes-list notes-list note-list-for-tasks show-permanent">
            <div class="notes-list-header">
                <img src="upload/avatar.jpg" alt="" class="notes-list-avatar leads-table-avatar">
                <span class="notes-list-title">Notes</span>
                <span class="notes-list-subtitle">Andrew Vynarchyk</span>
                <button class="notes-list-close"></button>
            </div>
            <div class="notes-list-body">
                <div class="notes-list-item">
                    <span class="notes-list-item-title">Shubham Sethi</span>
                    <span class="notes-list-item-date">03/03/2021</span>
                    <span class="notes-list-item-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis lorem purus malesuada pellentesque.
                    </span>
                </div>
                <div class="notes-list-item">
                    <span class="notes-list-item-title">Andrew Vynarchyk</span>
                    <span class="notes-list-item-date">02/02/2021</span>
                    <span class="notes-list-item-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis lorem purus malesuada pellentesque.
                    </span>
                </div>
                <div class="notes-list-item">
                    <span class="notes-list-item-title">Shubham Sethi</span>
                    <span class="notes-list-item-date">01/01/2021</span>
                    <span class="notes-list-item-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis lorem purus malesuada pellentesque.
                    </span>
                </div>
                <div class="notes-list-item">
                    <span class="notes-list-item-title">Andrew Vynarchyk</span>
                    <span class="notes-list-item-date">12/12/2020</span>
                    <span class="notes-list-item-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Venenatis lorem purus malesuada pellentesque.
                    </span>
                </div>
            </div>
            <input type="text" class="text-input notes-list-input" placeholder="Type message...">
        </div>`,
        allowHTML: true,
        interactive: true,
        trigger: 'click',
        placement: 'bottom',
        //hideOnClick: 'toggle',
        appendTo: () => document.body
    });

    //-----------------------------------------//

    //modal
    $(document).on('click', '.modal-plus', function (event) {
        event.preventDefault();
        $('.modal-shadow').fadeIn('200');
        $('#create-new-campaign').fadeIn('200');
    });

    $(document).on('click', '.modal-demo', function (event) {
        event.preventDefault();
        $('.modal-shadow').fadeIn('200');
        $('#demo').fadeIn('200');
    });

    $(document).on('click', '.appointments-item', function (event) {
        event.preventDefault();
        $('.modal-shadow').fadeIn('200');
        $('#view-appointment').fadeIn('200');
    });

    $(document).on('click', '.modal-close', function (event) {
        event.preventDefault();
        $('.modal-shadow').fadeOut('200');
        $(this).parents('.modal').fadeOut('200');
    });

    //-----------------------------------------//

    if ($('.ztooltip').length) {
        var tooltip = new $.Zebra_Tooltips($('.ztooltip'), {
            position: 'left'
        });
        //tooltip.show($('.ztooltip2'), true);
    }

    //-----------------------------------------//

    const getOrCreateLegendList = (chart, id) => {
        const legendContainer = document.getElementById(id);
        let listContainer = legendContainer.querySelector('ul');

        if (!listContainer) {
            listContainer = document.createElement('ul');

            legendContainer.appendChild(listContainer);
        }

        return listContainer;
    };

    const htmlLegendPlugin = {
        id: 'htmlLegend',
        afterUpdate(chart, args, options) {
            const ul = getOrCreateLegendList(chart, options.containerID);
            ul.classList.add('new-reports-legend-ul');

            // Remove old legend items
            while (ul.firstChild) {
                ul.firstChild.remove();
            }

            // Reuse the built-in legendItems generator
            const items = chart.options.plugins.legend.labels.generateLabels(chart);

            items.forEach((item, index) => {
                const li = document.createElement('li');

                li.onclick = () => {
                    const { type } = chart.config;
                    if (type === 'pie' || type === 'doughnut') {
                        // Pie and doughnut charts only have a single dataset and visibility is per item
                        chart.toggleDataVisibility(item.index);
                    } else {
                        chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                    }
                    chart.update();
                };

                // Color box
                const boxSpan = document.createElement('span');
                boxSpan.classList.add('new-reports-legend-icon');
                boxSpan.style.background = item.fillStyle;
                boxSpan.style.borderColor = item.strokeStyle;
                boxSpan.style.borderWidth = item.lineWidth + 'px';

                // Text
                const textContainer = document.createElement('p');
                textContainer.style.color = item.fontColor;
                textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

                const text = document.createElement('span');
                text.innerHTML = '<span class="new-reports-legend-label">' + item.text + '</span><span class="new-reports-legend-value"> ' + chart.data.datasets[0].data[index] + '</span>';
                textContainer.appendChild(text);

                li.appendChild(boxSpan);
                li.appendChild(textContainer);
                ul.appendChild(li);
            });
        }
    };

    const chartColors1 = ['#3A66ED', '#F5717A', '#FBC563', '#99DC13', '#DFDFDF'],
        chartColors2 = ['#3F68E5', '#7994EB', '#8CA3EE', '#B2C2F4', '#C7D4FB'];

    //chart.js
    if ($('#chart').length) {

        var chart = document.getElementById('chart').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 500);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.5)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.25)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['Nov 1', 'Nov 5', 'Nov 10', 'Nov 15', 'Nov 20', 'Nov 25', 'Nov 30', 'Dec 1', 'Dec 5'],
            datasets: [{
                label: 'Delivered',
                backgroundColor: gradient,
                pointBackgroundColor: '#3C68EC',
                borderWidth: 1,
                borderColor: '#3C68EC',
                data: [0, 200, 40, 80, 42, 18, 60, 80, 30]
            }]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'rgba(200, 200, 200, 0)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: 'rgba(238, 238, 238, 1)',
                        lineWidth: 1
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                legend: false
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            tooltips: {
                displayColors: false,
                titleFontFamily: 'Manrope',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                titleFontColor: '#1C2538',
                boxShadow: '0 1px 10px #f00',
                bodyFontColor: '#8A8B93',
                caretSize: 5,
                cornerRadius: 5,
                xPadding: 10,
                yPadding: 10,
                borderColor: '#eeeeee',
                borderWidth: 1
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart1').length) {

        var chart = document.getElementById('chart1').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 500),
            gradient2 = chart.createLinearGradient(0, 0, 0, 500);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.5)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.25)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        gradient2.addColorStop(0, 'rgba(243, 83, 94, 0.5)');
        gradient2.addColorStop(0.5, 'rgba(243, 83, 94, 0.25)');
        gradient2.addColorStop(1, 'rgba(243, 83, 94, 0)');

        var data = {
            labels: ['Nov 1', 'Nov 5', 'Nov 10', 'Nov 15', 'Nov 20', 'Nov 25', 'Nov 30', 'Dec 1', 'Dec 5'],
            datasets: [
                {
                    label: 'Delivered',
                    backgroundColor: gradient,
                    pointBackgroundColor: '#3C68EC',
                    borderWidth: 1,
                    borderColor: '#3C68EC',
                    data: [0, 120, 40, 80, 42, 18, 60, 80, 30]
                },
                {
                    label: 'Delivered',
                    backgroundColor: gradient2,
                    pointBackgroundColor: '#F3535E',
                    borderWidth: 1,
                    borderColor: '#F3535E',
                    data: [0, 10, 50, 100, 52, 68, 20, 90, 50]
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'rgba(200, 200, 200, 1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: 'rgba(238, 238, 238, 1)',
                        lineWidth: 1
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                legend: false
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            tooltips: {
                displayColors: false,
                titleFontFamily: 'Manrope',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                titleFontColor: '#1C2538',
                boxShadow: '0 1px 10px #f00',
                bodyFontColor: '#8A8B93',
                caretSize: 5,
                cornerRadius: 5,
                xPadding: 10,
                yPadding: 10,
                borderColor: '#eeeeee',
                borderWidth: 1
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart2').length) {

        var chart = document.getElementById('chart2').getContext('2d');

        var data = {
            labels: ['16+', '21-27', '28-33', '34-38', '40-45', '46-51', '52+'],
            datasets: [
                {
                    label: 'Dataset 1',
                    backgroundColor: '#C7D3F9',
                    borderWidth: 1,
                    borderColor: '#C7D3F9',
                    data: [40, 95, 30, 95, 42, 68, 70]
                },
                {
                    label: 'Dataset 2',
                    backgroundColor: '#3C68EC',
                    borderWidth: 1,
                    borderColor: '#3C68EC',
                    data: [20, 90, 40, 45, 62, 18, 60]
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'rgba(238, 238, 238, 1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: 'rgba(238, 238, 238, 1)',
                        lineWidth: 1
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                legend: false
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            tooltips: {
                displayColors: false,
                titleFontFamily: 'Manrope',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                titleFontColor: '#1C2538',
                boxShadow: '0 1px 10px #f00',
                bodyFontColor: '#8A8B93',
                caretSize: 5,
                cornerRadius: 5,
                xPadding: 10,
                yPadding: 10,
                borderColor: '#eeeeee',
                borderWidth: 1
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'bar',
            data: data,
            options: options
        });

    }

    if ($('#chart3').length) {

        var chart = document.getElementById('chart3').getContext('2d');

        var data = {
            labels: ['16+', '21-27', '28-33', '34-38', '40-45', '46-51', '52+'],
            datasets: [
                {
                    label: 'Dataset 1',
                    backgroundColor: '#F3535E',
                    borderWidth: 1,
                    borderColor: '#F3535E',
                    data: [40, 95, 30, 95, 42, 68, 70]
                },
                {
                    label: 'Dataset 2',
                    backgroundColor: '#3C68EC',
                    borderWidth: 1,
                    borderColor: '#3C68EC',
                    data: [20, 90, 40, 45, 62, 18, 60]
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'rgba(238, 238, 238, 1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: 'rgba(238, 238, 238, 1)',
                        lineWidth: 1
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                legend: false
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            tooltips: {
                displayColors: false,
                titleFontFamily: 'Manrope',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                titleFontColor: '#1C2538',
                boxShadow: '0 1px 10px #f00',
                bodyFontColor: '#8A8B93',
                caretSize: 5,
                cornerRadius: 5,
                xPadding: 10,
                yPadding: 10,
                borderColor: '#eeeeee',
                borderWidth: 1
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'bar',
            data: data,
            options: options
        });

    }

    if ($('#chart4').length) {

        var chart = document.getElementById('chart4').getContext('2d');

        var data = {
            labels: ['16+', '21-27', '28-33', '34-38', '40-45', '46-51', '52+'],
            datasets: [
                {
                    label: 'Dataset 1',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    borderColor: '#FFBF4B',
                    data: [40, 95, 30, 95, 42, 68, 70]
                },
                {
                    label: 'Dataset 2',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointBackgroundColor: '#ffffff',
                    borderColor: '#3C68EC',
                    data: [20, 90, 40, 45, 62, 18, 60]
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        color: 'rgba(238, 238, 238, 1)',
                        lineWidth: 1
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        color: 'rgba(238, 238, 238, 1)',
                        lineWidth: 1
                    }
                }]
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                legend: false
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            tooltips: {
                displayColors: false,
                titleFontFamily: 'Manrope',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                titleFontColor: '#1C2538',
                boxShadow: '0 1px 10px #f00',
                bodyFontColor: '#8A8B93',
                caretSize: 5,
                cornerRadius: 5,
                xPadding: 10,
                yPadding: 10,
                borderColor: '#eeeeee',
                borderWidth: 1
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart5').length) {

        var chart = document.getElementById('chart5').getContext('2d');

        var data = {
            labels: ['Total number of contacts', 'Number of emails', 'Number of Phone numbers', 'Number of Facebook Ids'],
            datasets: [
                {
                    label: 'Dataset 1',
                    backgroundColor: ['#3C68EC', '#F3535E', '#FFBF4B', '#99DC13'],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    data: [25, 37, 13, 25]
                }
            ]
        };

        var options = {
            segmentShowStroke: false,
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520,
                onComplete: function () {
                    // var ctx = this.chart.ctx;
                    // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
                    // ctx.textAlign = 'center';
                    // ctx.textBaseline = 'bottom';

                    // this.data.datasets.forEach(function (dataset) {

                    //     for (var i = 0; i < dataset.data.length; i++) {
                    //         var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                    //             total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                    //             mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
                    //             start_angle = model.startAngle,
                    //             end_angle = model.endAngle,
                    //             mid_angle = start_angle + (end_angle - start_angle) / 2;

                    //         var x = mid_radius * Math.cos(mid_angle);
                    //         var y = mid_radius * Math.sin(mid_angle);

                    //         ctx.fillStyle = '#fff';
                    //         if (i == 3) { // Darker text color for lighter background
                    //             ctx.fillStyle = '#444';
                    //         }
                    //         var percent = String(Math.round(dataset.data[i] / total * 100)) + "%";
                    //         //ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                    //         // Display percent in another line, line break doesn't work for fillText
                    //         ctx.fillText(percent, model.x + x, model.y + y);
                    //     }
                    // });
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            // legend: {
            //     position: 'right',
            // },
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            tooltips: {
                display: false
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'pie',
            data: data,
            options: options
        });

    }

    if ($('#chart-customers').length) {

        var chart = document.getElementById('chart-customers').getContext('2d');

        var data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
            datasets: [
                {
                    data: [40, 95, 30, 95, 42, 68, 70],
                    label: 'Cancelled Customers',
                    backgroundColor: '#3F68E5',
                    borderColor: '#F3F4F5',
                    borderWidth: 0,
                    borderRadius: 8,
                    borderSkipped: false,
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: '#ffffff',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'bar',
            data: data,
            options: options
        });

    }

    if ($('#chart-gender').length) {

        var chart = document.getElementById('chart-gender').getContext('2d');

        var data = {
            labels: ['Women', 'Men'],
            datasets: [
                {
                    data: [25, 250],
                    label: '',
                    backgroundColor: ['#F5717A', '#3F68E5'],
                    borderWidth: 0,
                    pointStyle: 'cross',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-gender',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    },
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    if ($('#chart-age').length) {

        var chart = document.getElementById('chart-age').getContext('2d');

        var data = {
            labels: ['20s', '30s', '40s', '50s', '60+'],
            datasets: [
                {
                    data: [25, 20, 20, 20, 15],
                    label: '',
                    backgroundColor: ['#3A66ED', '#F5717A', '#FBC563', '#99DC13', '#DFDFDF'],
                    borderWidth: 0,
                    pointStyle: 'circle',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-age',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    if ($('#chart-breakdown').length) {

        var chart = document.getElementById('chart-breakdown').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.2)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.15)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Active',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#3A66ED',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#3A66ED',
                fill: true,
                data: [0, 100, 40, 80, 42, 18, 60, 80, 30],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'Churned',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#F6C161',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#F6C161',
                fill: true,
                data: [0, 30, 90, 100, 52, 30, 18, 60, 80],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-age-2').length) {

        var chart = document.getElementById('chart-age-2').getContext('2d');

        var data = {
            labels: ['20s', '30s', '40s', '50s', '60+'],
            datasets: [
                {
                    data: [25, 20, 20, 20, 15],
                    label: '',
                    backgroundColor: chartColors2,
                    borderWidth: 0,
                    pointStyle: 'circle',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-age-2',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    if ($('#chart-membership').length) {

        var chart = document.getElementById('chart-membership').getContext('2d');

        var data = {
            labels: ['Plan A', 'Plan B', 'Plan C', 'Plan D', 'Plan E'],
            datasets: [
                {
                    data: [2500, 3000, 2700, 2800, 3200],
                    label: '',
                    backgroundColor: chartColors1,
                    borderWidth: 0,
                    pointStyle: 'circle',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-membership',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    if ($('#chart-trainer').length) {

        var chart = document.getElementById('chart-trainer').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.2)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.15)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020', 'May 2020', 'Jun 2020', 'Jul 2020', 'Aug 2020', 'Sep 2020'],
            datasets: [{
                label: 'Highest rates',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#3A66ED',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#3A66ED',
                fill: true,
                data: [0, 100, 40, 80, 42, 18, 60, 80, 30],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-studio').length) {

        var chart = document.getElementById('chart-studio').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(255, 191, 75, 0.2)');
        gradient.addColorStop(0.5, 'rgba(255, 191, 75, 0.15)');
        gradient.addColorStop(1, 'rgba(255, 191, 75, 0)');

        var data = {
            labels: ['01', '02', '03', '04', '05', '06', '07', '07', '09', '10', '11', '12', '13', '14', '15'],
            datasets: [{
                label: 'Under rates today',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#FFBF4B',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#FFBF4B',
                fill: true,
                data: [0, 70, 40, 80, 42, 18, 60, 80, 30, 40, 100, 40, 80, 42, 18],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        lineWidth: 2,
                        //display: false,
                        color: function (context) {
                            if (context.tick.value == 50) {
                                return '#FFBF4B';
                            }
                            return 'transparent';
                        },
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-engagement').length) {

        var chart = document.getElementById('chart-engagement').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.2)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.15)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Loyal Customer',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#3A66ED',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#3A66ED',
                fill: true,
                data: [0, 100, 40, 80, 42, 18, 60, 80, 30],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'Churned Customer',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#F5717A',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#F5717A',
                fill: true,
                data: [0, 30, 90, 100, 52, 30, 18, 60, 80],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-engagement-persona').length) {

        var chart = document.getElementById('chart-engagement-persona').getContext('2d');

        var data = {
            labels: ['Persona 1', 'Persona 2', 'Persona 3', 'Persona 4', 'Persona 5', 'Persona 6', 'Persona 7', 'Persona 8', 'Persona 9', 'Persona 10'],
            datasets: [
                {
                    data: [25, 20, 20, 20, 15, 25, 20, 20, 20, 15],
                    label: '',
                    backgroundColor: chartColors2,
                    borderWidth: 0,
                    pointStyle: 'circle',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-engagement-persona',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    if ($('#chart-engagement-age').length) {

        var chart = document.getElementById('chart-engagement-age').getContext('2d');

        var data = {
            labels: ['20s', '30s', '40s', '50s', '60+'],
            datasets: [
                {
                    data: [25, 20, 20, 20, 15],
                    label: '',
                    backgroundColor: chartColors1,
                    borderWidth: 0,
                    pointStyle: 'circle',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-engagement-age',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    if ($('#chart-engagement-gender').length) {

        var chart = document.getElementById('chart-engagement-gender').getContext('2d');

        var data = {
            labels: ['Women', 'Men'],
            datasets: [
                {
                    data: [25, 250],
                    label: '',
                    backgroundColor: ['#F5717A', '#3F68E5'],
                    borderWidth: 0,
                    pointStyle: 'cross',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-engagement-gender',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    },
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    if ($('#chart-trainer-retention').length) {

        var chart = document.getElementById('chart-trainer-retention').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.2)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.15)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [{
                label: 'Total People targeted',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#3A66ED',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#3A66ED',
                fill: true,
                data: [0, 100, 40, 80, 42, 18, 60, 80, 30],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'People Engaged',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#F5717A',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#F5717A',
                fill: true,
                data: [0, 30, 90, 100, 52, 30, 18, 60, 80],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'Response',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#F4C673',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#F4C673',
                fill: true,
                data: [10, 20, 40, 40, 62, 20, 78, 90, 100],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-weekly-sms').length) {

        var chart = document.getElementById('chart-weekly-sms').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.2)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.15)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9'],
            datasets: [{
                label: 'SMS Sent',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#3A66ED',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#3A66ED',
                fill: true,
                data: [0, 100, 40, 80, 42, 18, 60, 80, 30],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'SMS Received',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#F6C161',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#F6C161',
                fill: true,
                data: [0, 30, 90, 100, 52, 30, 18, 60, 80],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-sms-hour').length) {

        var chart = document.getElementById('chart-sms-hour').getContext('2d');

        var data = {
            labels: ['8A', '9A', '10A', '11A', '12A', '1P', '2P', '3P', '4P', '5P', '6P', '7P', '9P'],
            datasets: [
                {
                    data: [35, 10, 25, 42, 38, 30, 45, 30, 20, 12, 38, 40, 45],
                    label: 'Yours',
                    backgroundColor: '#3A66ED',
                    borderColor: '#CFCFCF',
                    borderWidth: 2,
                    pointWith: 20,
                    pointHeight: 20,
                    borderRadius: 20,
                    borderSkipped: false,
                    pointBackgroundColor: '#3A66ED',
                    pointBorderWidth: 3,
                    fill: false,
                    borderDash: [5, 5],
                    pointBorderColor: '#ffffff',
                    //stack: 'combined',
                    type: 'line',
                    radius: 8
                },
                {
                    data: [45, 20, 35, 52, 48, 40, 55, 40, 30, 22, 48, 50, 55],
                    label: 'Average',
                    backgroundColor: '#FFBF4B',
                    borderColor: '#FFBF4B',
                    borderWidth: 0,
                    borderRadius: 8,
                    borderSkipped: false,
                    //stack: 'combined',
                    type: 'bar'
                },
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: '#ffffff',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    display: false,
                    //stacked: true
                },

            },
            elements: {
                line: {
                    tension: 0
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-sms-day').length) {

        var chart = document.getElementById('chart-sms-day').getContext('2d');

        var data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    data: [40, 95, 30, 95, 42, 68, 70, 60],
                    label: '',
                    backgroundColor: '#3F68E5',
                    borderColor: '#F3F4F5',
                    borderWidth: 0,
                    borderRadius: 8,
                    borderSkipped: false,
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: '#ffffff',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'bar',
            data: data,
            options: options
        });

    }

    if ($('#chart-weekly-email').length) {

        var chart = document.getElementById('chart-weekly-email').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.2)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.15)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9'],
            datasets: [{
                label: 'Email Sent',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#3A66ED',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#3A66ED',
                fill: true,
                data: [0, 100, 40, 80, 42, 18, 60, 80, 30],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            },
            {
                label: 'Email Opened',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: 'transparent',
                pointBackgroundColor: '#F3535E',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#F3535E',
                fill: true,
                data: [0, 30, 90, 100, 52, 30, 18, 60, 80],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-email-breakdown').length) {

        var chart = document.getElementById('chart-email-breakdown').getContext('2d');

        var data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    data: [30, 55, 20, 75, 32, 58, 60, 40],
                    label: 'Yours',
                    backgroundColor: '#3A66ED',
                    borderColor: '#CFCFCF',
                    borderWidth: 2,
                    pointWith: 20,
                    pointHeight: 20,
                    borderRadius: 20,
                    borderSkipped: false,
                    pointBackgroundColor: '#3A66ED',
                    pointBorderWidth: 3,
                    fill: false,
                    borderDash: [5, 5],
                    pointBorderColor: '#ffffff',
                    //stack: 'combined',
                    type: 'line',
                    radius: 8
                },
                {
                    data: [40, 95, 30, 95, 42, 68, 70, 60],
                    label: '',
                    backgroundColor: '#3F68E5',
                    borderColor: '#F3F4F5',
                    borderWidth: 0,
                    borderRadius: 8,
                    borderSkipped: false,
                    type: 'bar'
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: '#ffffff',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'bar',
            data: data,
            options: options
        });

    }

    if ($('#chart-email-open').length) {

        var chart = document.getElementById('chart-email-open').getContext('2d');

        var data = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    data: [30, 55, 20, 75, 32, 58, 60, 40],
                    label: 'Yours',
                    backgroundColor: '#3A66ED',
                    borderColor: '#CFCFCF',
                    borderWidth: 2,
                    pointWith: 20,
                    pointHeight: 20,
                    borderRadius: 20,
                    borderSkipped: false,
                    pointBackgroundColor: '#3A66ED',
                    pointBorderWidth: 3,
                    fill: false,
                    borderDash: [5, 5],
                    pointBorderColor: '#ffffff',
                    //stack: 'combined',
                    type: 'line',
                    radius: 8
                },
                {
                    data: [40, 95, 30, 95, 42, 68, 70, 60],
                    label: '',
                    backgroundColor: '#3F68E5',
                    borderColor: '#F3F4F5',
                    borderWidth: 0,
                    borderRadius: 8,
                    borderSkipped: false,
                    type: 'bar'
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: '#ffffff',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'bar',
            data: data,
            options: options
        });

    }

    if ($('#chart-video-people').length) {

        var chart = document.getElementById('chart-video-people').getContext('2d'),
            gradient = chart.createLinearGradient(0, 0, 0, 330);

        gradient.addColorStop(0, 'rgba(60, 104, 236, 0.2)');
        gradient.addColorStop(0.5, 'rgba(60, 104, 236, 0.15)');
        gradient.addColorStop(1, 'rgba(60, 104, 236, 0)');

        var data = {
            labels: ['8A', '9A', '10A', '11A', '12A', '1P', '2P', '3P', '4P', '5P', '6P', '7P', '9P'],
            datasets: [{
                label: 'Most People Watched',
                pointWith: 20,
                pointHeight: 20,
                backgroundColor: gradient,
                pointBackgroundColor: '#3A66ED',
                pointBorderWidth: 3,
                pointBorderColor: '#ffffff',
                borderWidth: 3,
                borderColor: '#3A66ED',
                fill: true,
                data: [0, 60, 40, 80, 42, 38, 60, 80, 30, 40, 20, 40, 30],
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        var options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.85,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            radius: 6,
            hoverRadius: 6,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickColor: '#ffffff',
                        borderColor: 'transparent',
                    },
                    ticks: {
                        color: '#6D6D6D',
                    },
                },
                y: {
                    grid: {
                        //display: false,
                        tickColor: '#ffffff',
                        borderColor: '#F2F2F2',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        display: false
                        //color: 'transparent',
                    },
                },

            },
            plugins: {
                legend: false,
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
            point: {
                backgroundColor: '#8A8B93'
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'line',
            data: data,
            options: options
        });

    }

    if ($('#chart-breakdown-class').length) {

        var chart = document.getElementById('chart-breakdown-class').getContext('2d');

        var data = {
            labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4'],
            datasets: [
                {
                    data: [25, 20, 20, 20],
                    label: '',
                    backgroundColor: chartColors1,
                    borderWidth: 0,
                    pointStyle: 'circle',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-breakdown-class',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            }
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    if ($('#chart-videos-breakdown-gender').length) {

        var chart = document.getElementById('chart-videos-breakdown-gender').getContext('2d');

        var data = {
            labels: ['Women', 'Men'],
            datasets: [
                {
                    data: [25, 250],
                    label: '',
                    backgroundColor: ['#F5717A', '#3F68E5'],
                    borderWidth: 0,
                    pointStyle: 'cross',
                }
            ]
        };

        var options = {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            animation: {
                easing: 'easeInOutQuad',
                duration: 520
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                },

            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            point: {
                backgroundColor: '#8A8B93'
            },
            plugins: {
                htmlLegend: {
                    containerID: 'legend-container-videos-breakdown-gender',
                },
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        padding: 20,
                        usePointStyle: true,
                    },
                },
                tooltip: {
                    backgroundColor: '#fff',
                    titleColor: '#000',
                    titleFont: '#000',
                    bodyColor: '#000',
                    // xAlign: 'center',
                    // yAlign: 'center',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    displayColors: false,
                    padding: 12
                },
            },
        };

        var chartInstance = new Chart(chart, {
            type: 'doughnut',
            data: data,
            options: options,
            plugins: [htmlLegendPlugin],
        });

    }

    $('.equal-height').matchHeight(options);


    $(document).on('click', '.charts-criteria-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.charts-criteria').toggleClass('close');
    });

    //-----------------------------------------//

    //drop
    activePop = null;
    function closeInactivePop() {
        $('.drop').each(function (index) {
            if ($(this).hasClass('drop-opened') && index != activePop) {
                $(this).removeClass('drop-opened');

                $('.create-campaign-option-time-menu').show();
                $('.create-campaign-specific').hide();
            }
        });
        return false;
    }
    $(document).on('mouseover', '.drop', function () {
        activePop = $('.drop').index(this);
    });
    $(document).on('mouseout', '.drop', function () {
        activePop = null;
    });
    $(document.body).on('click', function (event) {
        closeInactivePop();
    });
    $(document).on('click', '.drop-toggle', function (event) {
        event.preventDefault();
        $(this).parent('.drop').toggleClass('drop-opened');
    });

    //-----------------------------------------//

    //tab
    $('.tabs').delegate('li:not(.active)', 'click', function () { $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250); });

    //-----------------------------------------//

    //toggle active
    $(document).on('click', '.toggle-active li:not(.active)', function (event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    //-----------------------------------------//

    //chat input option delete
    $(document).on('click', '.chat-input-option-delete', function (event) {
        event.preventDefault();
        $(this).parents('.chat-input-option').remove();
    });

    //-----------------------------------------//

    //newsletter panel
    $(document).on('click', '.newsletter-mail-button', function (event) {
        event.preventDefault();
        $('.newsletter-template').fadeIn('200');
    });
    $(document).on('click', '.newsletter-template-close', function (event) {
        event.preventDefault();
        $('.newsletter-template').fadeOut('200');
    });

    $(document).on('click', '.newsletter-design-button', function (event) {
        event.preventDefault();
        $('.newsletter-template').fadeOut('50');
        $('.newsletter-design').fadeIn('200');
        $('.chat-body-preview').fadeIn('200');
        $('.cmp-empty-chat-message').hide();
        $('.chat-body').removeClass('cmp-empty-chat-body');
    });
    $(document).on('click', '.newsletter-design-close', function (event) {
        event.preventDefault();
        $('.newsletter-design').fadeOut('200');
        $('.chat-body-preview').hide();
        $('.cmp-empty-chat-message').fadeIn('200');
        $('.chat-body').addClass('cmp-empty-chat-body');
    });

    //-----------------------------------------//

    //panel
    $(document).on('click', '.panel-toggle', function (event) {
        event.preventDefault();
        var thisId = $(this).attr('href');
        thisId = thisId.substr(1);
        $('[data-panel="' + thisId + '"]').addClass('show');
        $('html').addClass('panel-show');

        //
        if ($('#add-action-check-1').is(':checked') && thisId == 'email-content') {
            $('[data-panel="form-newsletter-email"]').addClass('show').fadeIn('300');
        } else {
            $('[data-panel="form-newsletter-email"]').removeClass('show').fadeOut('300');
        }
        if (thisId == 'form-preview') {
            $('[data-panel="form-newsletter-email"]').removeClass('show').fadeOut('300');
        }
        if (thisId == 'edit-appointment') {
            $('.modal-shadow').fadeOut('200');
            $('#view-appointment').fadeOut('200');
        }
    });

    $(document).on('click', '.panel-close, .panel-cancel, .panel-mask', function (event) {
        event.preventDefault();
        $('.panel').each(function (index, el) {
            $(el).removeClass('show');
        });
        $('html').removeClass('panel-show');
        $('[data-panel="form-newsletter-email"]').removeClass('show').fadeOut('300');
    });

    $(document).on('click', '.panel-inner-close, .panel-inner-cancel', function (event) {
        event.preventDefault();
        $(this).parents('.panel-inner').removeClass('show');

        if ($(this).parents('[data-panel="form-preview"]').length && $('#add-action-check-1').is(':checked')) {
            $('[data-panel="form-newsletter-email"]').addClass('show').fadeIn('300');
        }
        if ($(this).parents('[data-panel="email-content"]').length) {
            $('[data-panel="form-newsletter-email"]').removeClass('show').fadeOut('300');
        }

    });

    //-----------------------------------------//

    $(document).on('click', '.create-campaign-step.completed .create-campaign-step-caption', function (event) {
        event.preventDefault();
        $(this).parents('.create-campaign-step').toggleClass('active');
    });

    //-----------------------------------------//

    //new group step
    $(document).on('click', '.new-group-step-caption', function (event) {
        event.preventDefault();
        $(this).parents('.new-group-step').toggleClass('active').siblings('.new-group-step').removeClass('active');
    });

    //-----------------------------------------//

    //mask
    $('.mask-dob').mask('9999-99-99', { placeholder: 'YYYY-MM-DD' });
    $('.mask-time').mask('99:99', { placeholder: '00:00' });
    $('.mask-phone').mask('(999) 999 9999', { placeholder: '(510) 945 1277' });

    //-----------------------------------------//

    $(document).on('click', function (event) {
        var $target = $(event.target);
        //console.log($target[0]);
        if (
            !$target.closest('.create-campaign-automations-add-list').length
            &&
            $('.create-campaign-automations-add-list').is(":visible")
            &&
            !$target.closest('.create-campaign-automations-add-button').length
        ) {
            $('.create-campaign-automations-add-block:visible')
                .hide()
                .parents('.create-campaign-automations-add')
                .find('.create-campaign-automations-add-button')
                .show();
            //console.log('hide all');
        } else if ($target.closest('.create-campaign-automations-add-button').length) {
            //console.log('hide not this');
        }
    });

    function closeCampaignAutomationsAdd() {
        $('.create-campaign-automations-add-block:visible').hide().parents('.create-campaign-automations-add').find('.create-campaign-automations-add-button').show();
    }

    $(document).on('click', '.create-campaign-automations-add-action', function (event) {
        closeCampaignAutomationsAdd();
    });

    //create campaign automations add
    $(document).on('click', '.create-campaign-automations-add-button', function (event) {
        event.preventDefault();
        closeCampaignAutomationsAdd();
        $(this).addClass('current').hide().parents('.create-campaign-automations-add').find('.create-campaign-automations-add-block').show();
    });

    //-----------------------------------------//

    //create campaign automations delay
    $(document).on('click', '.create-campaign-automations-add-delay', function (event) {
        event.preventDefault();
        $(this).parents('.create-campaign-automations-add-block').hide();
        $(this).parents('.create-campaign-automations-add').find('.create-campaign-automations-delay').fadeIn('200');
    });

    $(document).on('click', '.create-campaign-automations-delay-cancel', function (event) {
        event.preventDefault();
        $(this).parents('.create-campaign-automations-delay').hide();
        $(this).parents('.create-campaign-automations-add').find('.create-campaign-automations-add-block').fadeIn('200');
    });

    //-----------------------------------------//

    function checkActiveAutomation3() {
        if ($('#campaign-step-3').hasClass('active')) {
            $('.create-campaign-zoom').fadeIn(150);
        } else {
            $('.create-campaign-zoom').fadeOut(150);
        }
    }
    checkActiveAutomation3();

    //-----------------------------------------////-----------------------------------------//

    //create campaign automations condition
    $(document).on('click', '.create-campaign-automations-add-condition', function (event) {
        event.preventDefault();
        $(this).parents('.create-campaign-automations-add-block').hide();
        $(this).parents('.create-campaign-automations-add').find('.create-campaign-automations-condition').fadeIn('200');
    });

    $(document).on('click', '.create-campaign-automations-condition-cancel', function (event) {
        event.preventDefault();
        $(this).parents('.create-campaign-automations-condition').hide();
        $(this).parents('.create-campaign-automations-add').find('.create-campaign-automations-add-block').fadeIn('200');
    });

    //-----------------------------------------//

    $(document).on('keydown', '.create-campaign-tags-new-text', function (event) {
        if (event.which == 13) {
            var thisValue = $(this).val();
            if (thisValue != '') {
                var thisParent = $(this).parents('.create-campaign-tags');
                $('<div class="create-campaign-tags-item"><div class="create-campaign-tag">' + thisValue + '<a href="#" class="create-campaign-tag-delete"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M11 9.70376L15.5375 5.16626L16.8337 6.46243L12.2962 10.9999L16.8337 15.5374L15.5375 16.8336L11 12.2961L6.4625 16.8336L5.16634 15.5374L9.70384 10.9999L5.16634 6.46243L6.4625 5.16626L11 9.70376Z" fill="#1C2538" class="svg-fill"></path></g></svg></a></div></div>').appendTo(thisParent.find('.create-campaign-tags-pull'));
                $(this).val('');
            }
        }
    });

    $(document).on('keydown', '.new-segmentation-tags-input', function (event) {
        if (event.which == 13) {
            var thisValue = $(this).val();
            if (thisValue != '') {
                var thisParent = $(this).parents('.new-segmentation-tags');
                $('<div class="create-campaign-tags-item"><div class="create-campaign-tag">' + thisValue + '<a href="#" class="create-campaign-tag-delete"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M11 9.70376L15.5375 5.16626L16.8337 6.46243L12.2962 10.9999L16.8337 15.5374L15.5375 16.8336L11 12.2961L6.4625 16.8336L5.16634 15.5374L9.70384 10.9999L5.16634 6.46243L6.4625 5.16626L11 9.70376Z" fill="#1C2538" class="svg-fill"></path></g></svg></a></div></div>').appendTo(thisParent.find('.new-segmentation-tags-pull'));
                $(this).val('');
            }
        }
    });

    //-----------------------------------------//

    $(document).on('click', '.create-campaign-tag-delete', function (event) {
        event.preventDefault();
        $(this).parents('.create-campaign-tags-item').fadeOut('150', function () {
            $(this).remove();
        });
    });

    //-----------------------------------------//

    $(document).on('change', '.create-campaign-goal-radio input', function () {
        var labelText = $(this).parents('.create-campaign-goal-radio').find('.create-campaign-goal-title').text();
        $('.create-campaign-goal-toggle').text(labelText);
        activePop = null;
        closeInactivePop();
    });

    //-----------------------------------------//

    $(document).on('click', '.new-segmentation-conditions-delete', function (event) {
        event.preventDefault();
        var thisParent = $(this).parents('.new-segmentation-conditions');
        $(this).parents('.new-segmentation-conditions-item').fadeOut('150', function () {
            $(this).prev('.new-segmentation-conditions-sep').remove();
            $(this).remove();
            if (!thisParent.find('.new-segmentation-conditions-item').length) {
                thisParent.prev('.new-segmentation-conditions-type').remove();
                thisParent.remove();
            }
        });
    });

    //-----------------------------------------//

    $(document).on('click', '.new-segmentation-conditions-add', function (event) {
        event.preventDefault();
        var rowTemplate = '<div class="new-segmentation-conditions-sep"></div><div class="new-segmentation-conditions-item"><div class="new-segmentation-conditions-col"><select class="select"><option>Check-In</option></select></div><div class="new-segmentation-conditions-col"><select class="select"><option>Equal To</option></select></div><div class="new-segmentation-conditions-col"><input type="text" class="input-text mask-dob input-datepicker" placeholder="YYYY-MM-DD"></div><div class="new-segmentation-conditions-col new-segmentation-conditions-col-delete"><a href="#" class="new-segmentation-conditions-delete"><span class="new-segmentation-conditions-delete-icon"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.66665 1.33325V2.66659H1.33331V3.99992H2.66665V13.9999C2.66665 14.3681 2.96512 14.6666 3.33331 14.6666H12.6666C13.0348 14.6666 13.3333 14.3681 13.3333 13.9999V3.99992H14.6666V2.66659H11.3333V1.33325H4.66665ZM3.99998 13.3333V3.99992H12V13.3333H3.99998ZM5.99998 5.99992H7.33331V11.3333H5.99998V5.99992ZM9.99998 5.99992H8.66665V11.3333H9.99998V5.99992Z" fill="#B7BABF" class="svg-fill"></path></svg></span><span class="new-segmentation-conditions-delete-text">Delete</span></a></div></div>';
        $(rowTemplate).insertBefore($(this));
        $('.mask-dob').mask('9999-99-99', { placeholder: 'YYYY-MM-DD' });
        $('.input-datepicker').datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: "mm-dd-yy",
        });
    });

    //-----------------------------------------//

    $(document).on('click', '.new-segmentation-conditions-type li a', function (event) {
        event.preventDefault();
        $(this).parents('li').addClass('active').siblings('li').removeClass('active');
    });

    //-----------------------------------------//

    //new segmentation add group
    $(document).on('click', '.new-segmentation-add-group .button', function (event) {
        event.preventDefault();
        var thisTemplate = $('#segmentation-group').html();
        $(thisTemplate).insertBefore($(this).parents('.new-segmentation-add-group'));
        $('.mask-dob').mask('9999-99-99', { placeholder: 'YYYY-MM-DD' });
        $('.input-datepicker').datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: "mm-dd-yy",
        });
    });

    //-----------------------------------------//

    //create campaign option specific
    $(document).on('click', '.create-campaign-option-specific', function (event) {
        event.preventDefault();
        $(this).parents('.create-campaign-option-time-menu').hide();
        $(this).parents('.create-campaign-option-time-block').find('.create-campaign-specific').fadeIn('200');
    });

    //-----------------------------------------//

    //create campaign option ongoing
    $(document).on('click', '.create-campaign-option-ongoing, .chat-input-option-edit', function (event) {
        event.preventDefault();
        activePop = null;
        closeInactivePop();
    });

    //-----------------------------------------//

    //datepicker
    $('.datepicker').datepicker({
        inline: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: "mm-dd-yy",
        onSelect: function (dateText, inst) {
            $('.create-campaign-specific-date input').val(dateText);
        }
    });


    initInputDatepicker();
    function initInputDatepicker() {
        $('.input-datepicker').datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            dateFormat: "mm-dd-yy",
        });
    }

    //-----------------------------------------//

    //new reports datepicker
    $('.mask-date').mask('99/99/9999', { placeholder: 'mm/dd/yyyy' });
    $('.new-reports-datepicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: "mm/dd/yy",
    });

    //-----------------------------------------//

    //new reports engaged mobile
    $(document).on('click', '.new-reports-engaged-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.new-reports-engaged-item').toggleClass('active');
    });

    //-----------------------------------------//

    //new reports campaign mobile
    $(document).on('click', '.new-reports-campaign-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.new-reports-campaign-item').toggleClass('active');
    });

    //-----------------------------------------//

    //new reports diagram nav
    $(document).on('click', '.new-reports-diagram-block-nav-list a', function (event) {
        event.preventDefault();
        $(this).parent('li').addClass('active').siblings('li').removeClass('active');
    });

    //-----------------------------------------//

    //add action template visibility
    $(document).on('click', '.add-action-template-visibility', function (event) {
        event.preventDefault();
        //$(this).toggleClass('active');
        $('#email-view-1').addClass('shown');
    });

    //-----------------------------------------//

    $(document).on('click', '.add-action-form-add', function (event) {
        event.preventDefault();
        $('.add-action-form-input-pull').append($('#add-action-subject').html());
        addActionIndex();
    });

    $(document).on('click', '.add-action-form-delete', function (event) {
        event.preventDefault();
        $(this).parents('.add-action-form-input').remove();
        addActionIndex();
    });

    function addActionIndex() {
        $('.add-action-form-input-pull .add-action-form-input').each(function (index, value) {
            var thisIndex = ++index;
            $(value).find('.add-action-form-subject-index').text(thisIndex);

            $(value).find('.input-text').attr('id', 'add-action-form-subject-' + thisIndex);
            $(value).find('.add-action-form-subject').attr('for', 'add-action-form-subject-' + thisIndex);
        });
    }

    //-----------------------------------------//

    //add action item
    $(document).on('click', '.add-action-item', function (event) {
        event.preventDefault();
        $(this).parents('.add-action-other').find('.add-action-item').removeClass('active');
        if (!$(this).hasClass('panel-toggle')) {
            $(this).addClass('active');
        }
    });

    //-----------------------------------------//

    //add action form option
    $(document).on('click', 'a.add-action-form-option', function (event) {
        event.preventDefault();
        $(this).parents('.add-action-form-options').find('.add-action-form-option').removeClass('active');
        $(this).addClass('active');
    });

    //-----------------------------------------//

    //reports action mobile
    $(document).on('click', '.reports-action-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.reports-action').toggleClass('active').find('.reports-action-block').slideToggle(200);
    });

    //-----------------------------------------//

    //panZoomElement.panzoom("option", "ignoreChildrensEvents", false);

    //panzoom
    var panZoomElement = $('.panzoom');

    if (panZoomElement.length) {
        panZoomElement.panzoom({
            $zoomIn: $(".zoom-in"),
            $zoomOut: $(".zoom-out"),
            startTransform: undefined,
            maxScale: 1,
            minScale: 0.2,
            increment: 0.1,
            //contain: true,
            transition: true,
        });

        var panX = ($('.panzoom-parent').innerWidth() - parseInt($('.panzoom')[0].style.width)) / 2;

        //console.log(panX);
        panZoomElement.panzoom("pan", panX, 0, {
            animate: false,
            silent: true
        });

        $(window).resize(function () {
            var panX = ($('.panzoom-parent').innerWidth() - parseInt($('.panzoom')[0].style.width)) / 2;
            panZoomElement.panzoom("pan", panX, 0, {
                animate: true,
                silent: true
            });
        });
    }

    $(document).on('mouseenter', '.panzoom select, .panzoom input, .panzoom textarea', function () {
        panZoomElement.panzoom("option", "disablePan", true);
    });
    $(document).on('mouseleave', '.panzoom select, .panzoom input, .panzoom textarea', function () {
        panZoomElement.panzoom("option", "disablePan", false);
    });

    function panZoomHeight() {
        var panHeight = $('.create-campaign-automations-content').innerHeight();
        $('.panzoom-parent, .panzoom').height(panHeight + 50);
    }

    panZoomHeight();

    $(document).on('click', '.zoom-change-height', function () {
        panZoomHeight();
    });


    $(document).on('click', '.edit-campaign-automations-delay', function () {
        var thisParent = $(this).parents('.create-campaign-automations-filled-item');
        thisParent.next('.create-campaign-automations-delay').show();
        thisParent.hide();
        panZoomHeight();
    });

    $(document).on('click', '.action-campaign-automations-delay-save, .action-campaign-automations-delay-cancel', function () {
        var thisParent = $(this).parents('.create-campaign-automations-delay');
        thisParent.prev('.create-campaign-automations-filled-item').show();
        thisParent.hide();
        panZoomHeight();
    });

    $(document).on('click', '.edit-campaign-automations-condition', function () {
        var thisParent = $(this).parents('.create-campaign-automations-filled-item');
        thisParent.next('.create-campaign-automations-condition').show();
        thisParent.hide();
        panZoomHeight();
    });

    $(document).on('click', '.action-campaign-automations-condition-save, .action-campaign-automations-condition-cancel', function () {
        var thisParent = $(this).parents('.create-campaign-automations-condition');
        thisParent.prev('.create-campaign-automations-filled-item').show();
        thisParent.hide();
        panZoomHeight();
    });

    //-----------------------------------------//

    $(document).on('change', '.custom-checkbox-hiden', function () {
        let leadsCheckbox = $('.custom-checkbox-hiden').is(':checked');
        if (leadsCheckbox) {
            $('.leads-header-buttons').removeClass('leads-header-buttons-hidden');
        } else {
            $('.leads-header-buttons').addClass('leads-header-buttons-hidden');
        }
    });

    //-----------------------------------------//

    //emotions-list
    $(document).on('click', '.emotions-list button', function (event) {
        event.preventDefault();
        var thisText = $(this).text();
        var thisDataTarget = $(this).parents('.emotions-list').data('emotions-textarea');
        //console.log(thisText, thisDataTarget);
        //
        var thisTextarea = $('.blur[data-textarea=' + thisDataTarget + ']');
        if (!thisTextarea.length) {
            thisTextarea = $('[data-textarea=' + thisDataTarget + ']').last();
        }
        var thisTextareaVal = thisTextarea.val();
        thisTextarea.val(thisTextareaVal + ' ' + thisText);
    });

    $(document).on('focusout', '[data-textarea]', function () {
        var thisData = $(this).data('textarea');
        $('[data-textarea=' + thisData + ']').removeClass('blur');
        $(this).addClass('blur');
    });

    //-----------------------------------------//

    $('#summernote').summernote({
        placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 120,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });

    //-----------------------------------------//

    $('.multi-select').multiSelect();

    $(document).on('change', '#add-action-check-1', function () {
        if ($(this).is(':checked')) {
            $('.add-action-newsletter-email').fadeIn('300');
            $('[data-panel="form-newsletter-email"]').addClass('show').fadeIn('300');
        } else {
            $('.add-action-newsletter-email').fadeOut('300');
            $('[data-panel="form-newsletter-email"]').removeClass('show').fadeOut('300');
        }
    });

    //-----------------------------------------//

    //add-action-form-option-file
    $(document).on('click', '.files-pull-list-item-remove', function (event) {
        event.preventDefault();
        $(this).parents('.files-pull-list-item').fadeOut(150);
    });

    //file custom
    $(document).on('change', '.file-custom', function (event) {
        var thisPullTarget = $(this).data('pull');
        var thisPull = $('[data-pull-list="' + thisPullTarget + '"]');
        var thisTemplate = $('.files-pull-template').html();
        if (thisPull.length) {
            thisPull.html('');
            var files = $(this)[0].files;
            for (var i = 0; i < files.length; i++) {
                var fileHTML = $(thisTemplate);
                fileHTML.find('.files-pull-list-item-name').text(files[i].name);
                fileHTML.find('.files-pull-list-item-size').text(parseInt(files[i].size / 1024) + 'kb');
                thisPull.append(fileHTML);
            }
        }
    });

    $(document).on('click', '.cmp-create-from-scratch-item-tag svg', function (event) {
        event.preventDefault();
        $(this).parents('.cmp-create-from-scratch-item-tag').remove();
        if ($('.cmp-create-from-scratch-item-tags .cmp-create-from-scratch-item-tag').length == 0) {
            $('.cmp-create-from-scratch-item-tags').hide();
        }
    });

    $(document).on('click', '.cmp-create-from-scratch-item-segments-list-item', function (event) {
        event.preventDefault();
        var thisParent = $(this).find('.cmp-create-from-scratch-item-segments-list-item-status');
        thisParent.toggleClass('done');
        if (thisParent.hasClass('done')) {
            console.log('checked');
        } else {
            console.log('unchecked');
        }
    });

    //change checkbox
    $(document).on('change', '.create-campaign-segmentation-checkbox input', function () {
        if ($(this).is(':checked')) {
            console.log('checked +');
        } else {
            console.log('unchecked -');
        }
    });

    // var thisClone = $('.clone');
    // var thisCloneHTML = thisClone.clone();
    // thisCloneHTML = thisCloneHTML;

    // $(thisCloneHTML).insertAfter('.clone');
    // $(thisCloneHTML).insertAfter('.clone');

    // $('.create-campaign-automations-content').append(thisClone);
    // panZoomHeight(); //change zoom height
    // initInputDatepicker(); //init datepicker

    //-----------------------------------------//

    $(document).on('click', '.new-group-create-list a', function (event) {
        event.preventDefault();
        $(this).parents('li').addClass('active').siblings('li').removeClass('active');
        $(this).parents('ul').next('ul').removeClass('hidden');
    });

    //-----------------------------------------//

    //https://xdsoft.net/jqplugins/autocomplete/
    var autocompleteData1 = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    var autocomplete1 = '#autocomplete';
    $(autocomplete1).autocomplete({
        source: [autocompleteData1]
    });

    function compareAutoData(data, value) {
        var data = data + '';
        data = data.toLowerCase();
        value = value.toLowerCase();
        if (data.indexOf(value) != '-1') {
            return true;
        } else {
            return false;
        }
    }

    $(document).on('keyup', autocomplete1, function () {
        var compareResult = compareAutoData(autocompleteData1, $(this).val());
        if (compareResult) {
            $(this).removeClass('error');
        } else {
            $(this).addClass('error');
        }
    });

    //-----------------------------------------//

    var autocomplete = new SelectPure(".autocomplete-select", {
        options: [
            {
                label: "Barbina",
                value: "ba",
            },
            {
                label: "Bigoli",
                value: "bg",
            },
            {
                label: "Bucatini",
                value: "bu",
            },
            {
                label: "Busiate",
                value: "bus",
            },
            {
                label: "Capellini",
                value: "cp",
            },
            {
                label: "Fedelini",
                value: "fe",
            },
            {
                label: "Maccheroni",
                value: "ma",
            },
            {
                label: "Spaghetti",
                value: "sp",
            },
        ],
        placeholder: "Search...",
        value: [],
        multiple: true,
        autocomplete: true,
        //icon: "fa fa-times",
        onChange: value => { console.log(value); },
    });

    //-----------------------------------------//

    let calendarEl = document.getElementById('appointments-calendar');
    if (calendarEl) {
        var calendar = new FullCalendar.Calendar(calendarEl, {
            customButtons: {
                myCustomButton: {
                    text: 'All Appointments',
                    click: function () {
                        alert('clicked the custom button!');
                    }
                }
            },
            initialView: 'dayGridMonth',
            initialDate: '2022-01-07',
            height: 'auto',
            buttonText: {
                month: 'Monthly',
                week: 'Weekly',
                day: 'Daily'
            },
            headerToolbar: {
                left: '',
                center: 'prev,title,next',
                right: 'dayGridMonth,timeGridWeek,timeGridDay myCustomButton'
            },
            eventContent: function (arg) {
                let customEvent = document.createElement('div');
                customEvent.classList.add('appointments-item');
                customEvent.style.borderColor = arg.event.borderColor;

                let customHTML = '';

                if (arg.event._def.title) {
                    customHTML += '<span class="appointments-item-title">' + arg.event._def.title + '</span>';
                }
                if (arg.event.extendedProps.time) {
                    customHTML += '<span class="appointments-item-time">' + arg.event.extendedProps.time + '</span>';
                }
                if (arg.event.extendedProps.responsible) {
                    customHTML += '<span class="appointments-item-responsible">' + arg.event.extendedProps.responsible + '</span>';
                }

                customEvent.innerHTML = customHTML;

                let arrayOfDomNodes = [customEvent]
                return { domNodes: arrayOfDomNodes }
            },
            events: [
                {
                    title: 'Lorem ipsum dolor sit amet',
                    start: '2022-01-01T10:30:00',
                    end: '2022-01-01T12:30:00',
                    borderColor: '#3c68ec',
                    backgroundColor: '#fff',
                    time: '08:20 to 08:50',
                    responsible: 'E'
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    start: '2022-01-03T10:30:00',
                    end: '2022-01-03T12:30:00',
                    borderColor: '#3c68ec',
                    backgroundColor: '#fff',
                    time: '08:20 to 08:50',
                    responsible: 'S'
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    start: '2022-01-07T10:30:00',
                    end: '2022-01-07T12:30:00',
                    borderColor: '#f00',
                    backgroundColor: '#fff',
                    time: '08:20 to 08:50',
                    responsible: 'K'
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    start: '2022-01-12T10:30:00',
                    end: '2022-01-12T12:30:00',
                    borderColor: '#3c68ec',
                    backgroundColor: '#fff',
                    time: '08:20 to 08:50',
                    responsible: 'S'
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    start: '2022-01-17T10:30:00',
                    end: '2022-01-17T12:30:00',
                    borderColor: '#f00',
                    backgroundColor: '#fff',
                    time: '08:20 to 08:50',
                    responsible: 'K'
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    start: '2022-01-27T10:30:00',
                    end: '2022-01-27T12:30:00',
                    borderColor: '#f00',
                    backgroundColor: '#fff',
                    time: '08:20 to 08:50',
                    responsible: 'J'
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    start: '2022-01-30T10:30:00',
                    end: '2022-01-30T12:30:00',
                    borderColor: '#f00',
                    backgroundColor: '#fff',
                    time: '08:20 to 08:50',
                    responsible: 'B'
                }
            ]
        });
        calendar.render();
        calendar.updateSize();
    }

    $(document).on('click', '.toggle-modal', function (event) {
        event.preventDefault();
        let thisDataID = $(this).data('id');
        $('#' + thisDataID).addClass('opened');
    });

    //-----------------------------------------//

    // function showAppointments(value) {
    //     $('.appointments-section').addClass('hidden');
    //     switch (value) {
    //         case 'Monthly':
    //             $('.appointments-monthly').removeClass('hidden');
    //             break;
    //         case 'Weekly':
    //             $('.appointments-weekly').removeClass('hidden');
    //             break;
    //         case 'Daily':
    //             $('.appointments-daily').removeClass('hidden');
    //             break;
    //         default:
    //             $('.appointments-section').eq(0).removeClass('hidden');
    //             break;
    //     }
    // }

    // $(document).on('change', '#appointments-sorting-trigger', function (event) {
    //     event.preventDefault();
    //     showAppointments($(this).val());
    // });

    //-----------------------------------------//

    $(document).on('click', '.cmp-info-plus', function (event) {
        event.preventDefault();
        var thisTemplate = $('#cmp-footer-subject').html();
        $('.cmp-footer-center-pull').append(thisTemplate);
    });

    $(document).on('click', '.cmp-chat-footer-delete', function (event) {
        event.preventDefault();
        $(this).parents('.cmp-footer-center-line').remove();
    });

    //--------------------------------------------//

    $(document).on('click', '.dashboard-tasks-title-tabs-list a', function (event) {
        event.preventDefault();
        $(this).parents('li').addClass('active').siblings('li').removeClass('active');
    });

    //--------------------------------------------//

    //

    // cut contact title on tablet
    if (document.querySelector(`#contact-title`) && window.innerWidth < 1170) document.querySelector(`#contact-title`).innerHTML = `cont,`
    // select lead row on checkbox
    if (document.querySelector(`.leads-table-row .custom-checkbox-hiden`)) document.querySelectorAll(`.leads-table-row .custom-checkbox-hiden`).forEach(e => e.onchange = toggleLeadRow)
    // toggle notes-list
    if (document.querySelector(`.leads-table-td.leads-table-notes svg`)) {
        document.querySelectorAll(`.leads-table-td.leads-table-notes .note-icon`).forEach(e => e.onclick = toggleNotesList)
        // if click outlise notelist or
        document.addEventListener(`click`, e => {
            if (!e.target.closest(`.leads-table-notes svg`) && !e.target.closest(`.leads-table-notes-list`)) {
                document.querySelectorAll(`.leads-table-notes-list`).forEach(e => e.classList.remove(`shown`))
                document.querySelectorAll(`.leads-table-td.leads-table-notes svg`).forEach(e => e.classList.remove(`opened`))
            }
        })
    }
    // close mobile notes-list
    if (document.querySelector(`.notes-list-close`)) document.querySelectorAll(`.notes-list-close`).forEach(e => e.onclick = closeNotesList)
    // toggle add new lead
    if (document.querySelector(`#add-new-lead-toggle`)) document.querySelector(`#add-new-lead-toggle`).onclick = openPopup
    if (document.querySelector(`#close-add-new-lead`)) document.querySelector(`#close-add-new-lead`).onclick = closePopupByButton
    if (document.querySelector(`#add-new-lead`)) document.querySelector(`#add-new-lead`).onclick = checkClosePopup
    // file upload
    if (document.querySelector(`#upload-csv-lead`)) document.querySelector(`#upload-csv-lead`).onchange = uploadLeadCSV
    // filter accords
    if (document.querySelector(`#filters .accord-header`)) document.querySelectorAll(`#filters .accord-header`).forEach(e => e.onclick = toggleAccord)
    // filter popup toggle
    if (document.querySelector(`#filters`)) document.querySelector(`#filters`).onclick = checkClosePopup
    if (document.querySelector(`#close-filters`)) document.querySelector(`#close-filters`).onclick = closePopupByButton
    if (document.querySelector(`#filters-toggle`)) document.querySelector(`#filters-toggle`).onclick = openPopup
    if (document.querySelector(`#filters-toggle-mobile`)) document.querySelector(`#filters-toggle-mobile`).onclick = openPopup
    // add note popup toggle
    if (document.querySelector(`.edit-current-lead`)) document.querySelectorAll(`.edit-current-lead`).forEach(e => e.onclick = openPopup)
    if (document.querySelector(`#close-add-note`)) document.querySelector(`#close-add-note`).onclick = closePopupByButton
    if (document.querySelector(`#add-note`)) document.querySelector(`#add-note`).onclick = checkClosePopup
    // task popup
    if (document.querySelector(`#upload-file-task`)) document.querySelector(`#upload-file-task`).onchange = uploadTaskFile
    if (document.querySelector(`#toggle-add-task`)) document.querySelector(`#toggle-add-task`).onclick = openPopup
    if (document.querySelector(`#close-add-task`)) document.querySelector(`#close-add-task`).onclick = closePopupByButton
    if (document.querySelector(`#add-task`)) document.querySelector(`#add-task`).onclick = checkClosePopup
    // lead search
    if (document.querySelector(`#search-lead-merge`)) document.querySelector(`#search-lead-merge`).oninput = showSearchLeadResult
    if (document.querySelector(`#search-lead-merge`)) document.querySelector(`#search-lead-merge`).onblur = hideSearchLeadResult
    if (document.querySelector(`.lead-search-result .lead-item-card`)) document.querySelectorAll(`.lead-search-result .lead-item-card`).forEach(e => e.onclick = showFoundLead)
    // merge leads popup toggle
    if (document.querySelector(`#merge-leads-toggle`)) document.querySelector(`#merge-leads-toggle`).onclick = openPopup
    if (document.querySelector(`#close-merge-leads`)) document.querySelector(`#close-merge-leads`).onclick = closePopupByButton
    if (document.querySelector(`#merge-leads`)) document.querySelector(`#merge-leads`).onclick = checkClosePopup
    // merge leads submit
    if (document.querySelector(`.merge-leads-form`)) document.querySelector(`.merge-leads-form`).onsubmit = showSuccessMere
    // cancel submit form in chat
    if (document.querySelector(`.chat-footer`)) document.querySelector(`.chat-footer`).onsubmit = e => e.preventDefault()
    // cut description title
    if (document.querySelector(`#task-description`) && window.innerWidth < 1170) document.querySelector(`#task-description`).innerHTML = `desc.`
    // toggle snooze popup
    if (document.querySelector(`#task-snooze`)) {
        document.querySelector(`#task-snooze`).onclick = toggleSnooze
        document.addEventListener(`click`, e => !e.target.closest(`#task-snooze`) ? document.querySelector(`#task-snooze`).classList.remove(`opened`) : true)
    }
    // task popup on page
    if (document.querySelector(`#upload-file-task-on-page`)) document.querySelector(`#upload-file-task-on-page`).onchange = uploadTaskFileOnPage
    if (document.querySelector(`#add-task-on-page-toggle`)) document.querySelector(`#add-task-on-page-toggle`).onclick = openPopup
    if (document.querySelector(`#close-add-task-on-page`)) document.querySelector(`#close-add-task-on-page`).onclick = closePopupByButton
    if (document.querySelector(`#add-task-on-page`)) document.querySelector(`#add-task-on-page`).onclick = checkClosePopup
    // task view popup
    if (document.querySelector(`.task-view-toggle`)) document.querySelectorAll(`.task-view-toggle`).forEach(e => e.onclick = openPopup)
    if (document.querySelector(`#close-edit-task-on-page`)) document.querySelector(`#close-edit-task-on-page`).onclick = closePopupByButton
    if (document.querySelector(`#edit-task-on-page`)) document.querySelector(`#edit-task-on-page`).onclick = checkClosePopup
    // profile tabs toggle
    if (document.querySelector(`.profile-top-tab`)) document.querySelectorAll(`.profile-top-tab`).forEach(e => e.onclick = toggleProfileTabs)
    // chat popup
    if (document.querySelectorAll(`.lead-chat-toggle, .pipeline-column-item-avatar, .profile-activities-item-avatar`)) document.querySelectorAll(`.lead-chat-toggle, .pipeline-column-item-avatar, .profile-activities-item-avatar`).forEach(e => e.onclick = openPopup)
    if (document.querySelector(`#close-chat`)) document.querySelector(`#close-chat`).onclick = closePopupByButton
    if (document.querySelector(`#chat-popup`)) document.querySelector(`#chat-popup`).onclick = checkClosePopup
    if (document.querySelector(`.back-to-chat`)) document.querySelector(`.back-to-chat`).onclick = closePopupByButton
    // profile window
    if (document.querySelector(`.chat-header-user`)) document.querySelector(`.chat-header-user`).onclick = toggleProfile
    if (document.querySelector(`#close-profile`)) document.querySelector(`#close-profile`).onclick = closeProfile
    // add column toggle
    if (document.querySelector(`#add-column-toggle`)) document.querySelector(`#add-column-toggle`).onclick = openPopup
    if (document.querySelector(`#close-add-column`)) document.querySelector(`#close-add-column`).onclick = closePopupByButton
    if (document.querySelector(`#add-column`)) document.querySelector(`#add-column`).onclick = checkClosePopup
    // add lead toggle pipeline page
    if (document.querySelector(`[data-action="add-new-lead-pipeline-toggle"]`)) document.querySelectorAll(`[data-action="add-new-lead-pipeline-toggle"]`).forEach(e => e.onclick = openPopup)
    if (document.querySelector(`#close-add-new-lead-pipeline`)) document.querySelector(`#close-add-new-lead-pipeline`).onclick = closePopupByButton
    if (document.querySelector(`#add-new-lead-pipeline`)) document.querySelector(`#add-new-lead-pipeline`).onclick = checkClosePopup
    if (document.querySelector(`#add-lead-manualy-toggle`)) document.querySelector(`#add-lead-manualy-toggle`).onclick = e => document.querySelector(`#add-lead-manualy`).classList.add(`shown`)
    if (document.querySelector(`#close-add-lead-manualy`)) document.querySelector(`#close-add-lead-manualy`).onclick = closePopupByButton
    if (document.querySelector(`#back-add-lead-manualy`)) document.querySelector(`#back-add-lead-manualy`).onclick = e => document.querySelector(`#add-lead-manualy`).classList.remove(`shown`)
    // automation toggle
    if (document.querySelector(`#automation-toggle`)) {
        document.querySelector(`#automation-toggle`).onclick = e => {
            document.querySelector(`#automation-popup`).classList.toggle(`shown`)
            if (window.innerWidth < 765) document.body.style.overflow = `hidden`
        }

        document.addEventListener(`click`, e => {
            if (!e.target.closest(`#automation-popup`) && !e.target.closest(`#automation-toggle`)) {
                document.querySelector(`#automation-popup`).classList.remove(`shown`)
            }
        })
    }
    if (document.querySelector(`#close-automation`)) document.querySelector(`#close-automation`).onclick = e => {
        document.querySelector(`#automation-popup`).classList.remove(`shown`)
        document.body.style.overflow = `auto`
    }
    if (document.querySelector(`.automation-item-edit`)) document.querySelectorAll(`.automation-item-edit`).forEach(e => e.onclick = openPopup)
    if (document.querySelector(`#close-edit-automation`)) document.querySelector(`#close-edit-automation`).onclick = closePopupByButton
    if (document.querySelector(`#edit-automation`)) document.querySelector(`#edit-automation`).onclick = checkClosePopup
    // toggle new automation
    if (document.querySelector(`#new-automation-toggle`)) document.querySelector(`#new-automation-toggle`).onclick = openPopup
    if (document.querySelector(`#close-new-automation`)) document.querySelector(`#close-new-automation`).onclick = closePopupByButton
    if (document.querySelector(`#new-automation`)) document.querySelector(`#new-automation`).onclick = checkClosePopup
    // remove automation
    if (document.querySelector(`.automation-item`)) document.querySelectorAll(`.automation-item-remove`).forEach(e => e.onclick = e => {
        openPopup(e)
        document.querySelector(`#remove-automation`).setAttribute(`data-id`, e.currentTarget.closest(`.automation-item`).getAttribute(`data-item-id`))
    })
    if (document.querySelector(`#close-remove-automation`)) document.querySelector(`#close-remove-automation`).onclick = closePopupByButton
    if (document.querySelector(`#remove-automation`)) document.querySelector(`#remove-automation`).onclick = checkClosePopup
    if (document.querySelector(`#remove-automation-submit`)) document.querySelector(`#remove-automation-submit`).onclick = e => {
        document.querySelector(`.automation-item[data-item-id="${e.currentTarget.closest(`#remove-automation`).getAttribute(`data-id`)}"]`).remove()
        closePopupByButton(e);
    }
    // toggle pipeline column edit
    if (document.querySelector(`.pipeline-column-menu`)) {
        document.querySelectorAll(`.pipeline-column-menu`).forEach(e => e.onclick = e => {
            document.querySelectorAll(`.pipeline-column-actions`).forEach(e => e.classList.remove(`shown`))
            e.currentTarget.closest(`.pipeline-column-header`).querySelector(`.pipeline-column-actions`).classList.add(`shown`)
        })

        document.addEventListener(`click`, e => {
            if (!e.target.closest(`.pipeline-column-actions`) && !e.target.closest(`.pipeline-column-menu`)) {
                document.querySelectorAll(`.pipeline-column-actions`).forEach(e => e.classList.remove(`shown`))
            }
        })
    }
    // remove leads
    if (document.querySelector(`.remove-current-lead`)) document.querySelectorAll(`.remove-current-lead`).forEach(e => e.onclick = removeLeadPopup)
    if (document.querySelector(`#close-remove-lead`)) document.querySelector(`#close-remove-lead`).onclick = closePopupByButton
    if (document.querySelector(`#remove-lead`)) document.querySelector(`#remove-lead`).onclick = checkClosePopup
    if (document.querySelector(`#remove-lead-submit`)) document.querySelector(`#remove-lead-submit`).onclick = e => {
        document.querySelector(`.leads-table-row[data-id="${e.currentTarget.closest(`#remove-lead`).getAttribute(`data-lead`)}"]`).remove()
        closePopupByButton(e);
    }
    // remove tasks
    if (document.querySelector(`.remove-current-task`)) document.querySelectorAll(`.remove-current-task`).forEach(e => e.onclick = removeTaskPopup)
    if (document.querySelector(`#close-remove-task`)) document.querySelector(`#close-remove-task`).onclick = closePopupByButton
    if (document.querySelector(`#remove-task`)) document.querySelector(`#remove-task`).onclick = checkClosePopup
    if (document.querySelector(`#remove-task-submit`)) document.querySelector(`#remove-task-submit`).onclick = e => {
        document.querySelector(`.leads-table-row.tasks[data-id="${e.currentTarget.closest(`#remove-task`).getAttribute(`data-task`)}"]`).remove()
        closePopupByButton(e);
    }
    // snooze task
    if (document.querySelector(`.watch-snooze-task`)) {
        document.querySelectorAll(`.watch-snooze-task`).forEach(e => e.onclick = e => {
            document.querySelectorAll(`.task-snooze-popup`).forEach(e => e.style.display = `none`)
            e.currentTarget.closest(`.leads-table-notes.tasks`).querySelector(`.task-snooze-popup`).style.display = `flex`
        })

        document.addEventListener(`click`, e => {
            if (!e.target.closest(`.watch-snooze-task`) && !e.target.closest(`.task-snooze-popup`)) document.querySelectorAll(`.task-snooze-popup`).forEach(e => e.style.display = `none`)
        })
    }
    // show success lead
    if (document.querySelector(`#submit-add-new-lead`)) {
        document.querySelector(`#submit-add-new-lead`).onsubmit = e => {
            closePopupByButton(e)
            e.preventDefault()
        }
    }
    // email menu
    if (document.querySelector(`.chat-message-email-menu`)) {
        document.querySelectorAll(`.chat-message-email-menu button`).forEach(btn => {
            btn.onclick = e => e.currentTarget.closest(`.chat-message-email-menu`).querySelector(`.chat-message-email-menu-list`).classList.add(`shown`)
        })

        document.addEventListener(`click`, e => {
            if (!e.target.closest(`.chat-message-email-menu button`) && !e.target.closest(`.chat-message-email-menu-list`)) {
                document.querySelectorAll(`.chat-message-email-menu-list`).forEach(list => list.classList.remove(`shown`))
            }
        })
    }
    // cmp chat menu
    if (document.querySelector(`#cmp-chat-menu-toggle`)) {
        document.querySelector(`#cmp-chat-menu-toggle`).onclick = e => e.currentTarget.closest(`.cmp-chat-header-menu`).querySelector(`.cmp-chat-header-menu-list`).classList.add(`shown`)

        document.addEventListener(`click`, e => {
            if (!e.target.closest(`#cmp-chat-menu-toggle`) && !e.target.closest(`.cmp-chat-header-menu-list`)) {
                document.querySelectorAll(`.cmp-chat-header-menu-list`).forEach(list => list.classList.remove(`shown`))
            }
        })
    }
    // cmp show email
    if (document.querySelector(`#show-email-1`)) {
        document.querySelector(`#show-email-1`).onclick = e => {
            document.querySelector(`#email-view-1`).classList.add(`shown`)
            document.querySelector(`#cmp-chat`).classList.add(`hidden`)

            if (window.innerWidth < 661) document.querySelector(`#cmp-chats`).classList.add(`hidden`)
        }
    }
    if (document.querySelector(`#close-email-1`)) {
        document.querySelector(`#close-email-1`).onclick = e => {
            document.querySelector(`#email-view-1`).classList.remove(`shown`)
            document.querySelector(`#cmp-chat`).classList.remove(`hidden`)

            if (window.innerWidth < 661) document.querySelector(`#cmp-chats`).classList.remove(`hidden`)
        }
    }
    // create email view
    if (document.querySelector(`#show-email-create-1`)) {
        document.querySelector(`#show-email-create-1`).onclick = () => {
            document.querySelector(`#email-view-1`).classList.add(`shown`)

            if (window.innerWidth < 661) document.querySelector(`#cmp-chats`).classList.add(`hidden`)
        }
    }
    // toggle sidebar
    if (document.querySelector(`#toggle-sidebar`)) {
        document.querySelector(`#toggle-sidebar`).onclick = e => {
            document.querySelector(`.sidebar-site`).classList.toggle(`collapse`)
            document.querySelector(`.main-site`).classList.toggle(`sidebar-collapse`)
        }
    }
    // cmp comments toggle
    if (document.querySelector(`.cmp-comments-toggle`)) {
        document.querySelectorAll(`.cmp-comments-toggle`).forEach(btn => btn.onclick = e => {
            document.querySelector(`#cmp-comments`).classList.add(`shown`)
        })
    }
    if (document.querySelector(`#cmp-close-comments`)) {
        document.querySelector(`#cmp-close-comments`).onclick = () => document.querySelector(`#cmp-comments`).classList.remove(`shown`)
    }
    // campaign info
    if (document.querySelector(`#cmp-campaing-info-toggle`)) {
        document.querySelector(`#cmp-campaing-info-toggle`).onclick = () => {
            document.querySelector(`#cmp-campaign-info`).classList.add(`shown`)
            document.querySelector(`#cmp-chat`).classList.add(`hidden`)

            if (window.innerWidth < 1200) document.querySelector(`#cmp-chats`).classList.add(`hidden`)
        }
    }
    if (document.querySelector(`#cmp-close-campaign-info`)) {
        document.querySelector(`#cmp-close-campaign-info`).onclick = () => {
            document.querySelector(`#cmp-campaign-info`).classList.remove(`shown`)
            document.querySelector(`#cmp-chat`).classList.remove(`hidden`)

            if (window.innerWidth < 1200) document.querySelector(`#cmp-chats`).classList.remove(`hidden`)
        }
    }
    // create campaign popup
    if (document.querySelector(`#cmp-chats-create-campaign-toggle`)) {
        document.querySelector(`#cmp-chats-create-campaign-toggle`).onclick = e => {
            document.querySelector(`#cmp-chats-create-campaign`).classList.add(`shown`)
        }
    }
    if (document.querySelector(`#cmp-close-create-campaign`)) {
        document.querySelector(`#cmp-close-create-campaign`).onclick = e => {
            document.querySelector(`#cmp-chats-create-campaign`).classList.remove(`shown`)
        }
    }
    // toggle pipeline row n columns
    if (document.querySelector(`#pipeline-leads-rows-toggle`)) {
        document.querySelector(`#pipeline-leads-rows-toggle`).onclick = e => {
            document.querySelector(`#pipeline-leads-rows`).style.display = `block`
            document.querySelector(`#pipeline-leads-columns`).style.display = `none`
            document.querySelector(`#pipeline-leads-tiles`).style.display = `none`
            document.querySelector(`#pipeline-leads-rows-toggle`).classList.add(`selected`)
            document.querySelector(`#pipeline-leads-columns-toggle`).classList.remove(`selected`)
            document.querySelector(`#pipeline-leads-tiles-toggle`).classList.remove(`selected`)
            //document.querySelector(`#add-new-lead-toggle`).classList.remove(`hidden`)
            //document.querySelector(`#leads-header-input`).classList.remove(`hidden`)
            //document.querySelector(`#leads-header-buttons`).classList.remove(`hidden`)
            //document.querySelector(`#pipeline-header-input`).classList.add(`hidden`)
            document.querySelector(`#pipeline-header-button`).classList.add(`hidden`)
            //document.querySelector(`#add-column-toggle`).classList.add(`hidden`)
        }
    }
    if (document.querySelector(`#pipeline-leads-columns-toggle`)) {
        document.querySelector(`#pipeline-leads-columns-toggle`).onclick = e => {
            document.querySelector(`#pipeline-leads-columns`).style.display = `flex`
            document.querySelector(`#pipeline-leads-rows`).style.display = `none`
            document.querySelector(`#pipeline-leads-tiles`).style.display = `none`
            document.querySelector(`#pipeline-leads-columns-toggle`).classList.add(`selected`)
            document.querySelector(`#pipeline-leads-rows-toggle`).classList.remove(`selected`)
            document.querySelector(`#pipeline-leads-tiles-toggle`).classList.remove(`selected`)
            //document.querySelector(`#add-new-lead-toggle`).classList.add(`hidden`)
            //document.querySelector(`#leads-header-input`).classList.add(`hidden`)
            //document.querySelector(`#leads-header-buttons`).classList.add(`hidden`)
            document.querySelector(`#pipeline-header-input`).classList.remove(`hidden`)
            document.querySelector(`#pipeline-header-button`).classList.remove(`hidden`)
            document.querySelector(`#add-column-toggle`).classList.remove(`hidden`)
        }
    }
    if (document.querySelector(`#pipeline-leads-tiles-toggle`)) {
        document.querySelector(`#pipeline-leads-tiles-toggle`).onclick = e => {
            document.querySelector(`#pipeline-leads-tiles`).style.display = `block`
            document.querySelector(`#pipeline-leads-rows`).style.display = `none`
            document.querySelector(`#pipeline-leads-columns`).style.display = `none`
            document.querySelector(`#pipeline-leads-tiles-toggle`).classList.add(`selected`)
            document.querySelector(`#pipeline-leads-rows-toggle`).classList.remove(`selected`)
            document.querySelector(`#pipeline-leads-columns-toggle`).classList.remove(`selected`)
            //document.querySelector(`#add-new-lead-toggle`).classList.add(`hidden`)
            //document.querySelector(`#leads-header-input`).classList.add(`hidden`)
            //document.querySelector(`#leads-header-buttons`).classList.add(`hidden`)
            document.querySelector(`#pipeline-header-input`).classList.remove(`hidden`)
            document.querySelector(`#pipeline-header-button`).classList.remove(`hidden`)
            document.querySelector(`#add-column-toggle`).classList.remove(`hidden`)
        }
    }
    // create from template
    if (document.querySelector(`#cmp-create-from-template-toggle`)) {
        document.querySelector(`#cmp-create-from-template-toggle`).onclick = () => {
            document.querySelector(`#cmp-chat`).classList.add(`hidden`)
            document.querySelector(`#cmp-chats`).classList.add(`hidden`)
            document.querySelector(`#cmp-create-from-template`).classList.add(`shown`)
            document.querySelector(`#email-view-1`).classList.remove(`shown`)
        }
    }
    if (document.querySelector(`#cmp-close-create-from-template`)) {
        document.querySelector(`#cmp-close-create-from-template`).onclick = () => {
            document.querySelector(`#cmp-chat`).classList.remove(`hidden`)
            document.querySelector(`#cmp-chats`).classList.remove(`hidden`)
            document.querySelector(`#cmp-create-from-template`).classList.remove(`shown`)
        }
    }
    // go to create lead from template
    if (document.querySelector(`.cmp-from-template-item`)) {
        document.querySelectorAll(`.cmp-from-template-item`).forEach(item => item.onclick = () => {
            window.location.href = '/create-campaign.html'
        })
    }
    if (document.querySelector(`#cmp-create-campaign`)) {
        document.querySelectorAll(`#cmp-create-campaign`).forEach(item => item.onclick = () => {
            window.location.href = '/create-campaign.html'
        })
    }
    if (document.querySelector(`.cmp-from-template-item-sms`)) {
        document.querySelectorAll(`.cmp-from-template-item-sms`).forEach(item => item.onclick = () => {
            window.location.href = '/create-campaign-sms.html'
        })
    }
    if (document.querySelector(`#cmp-create-campaign-sms`)) {
        document.querySelectorAll(`#cmp-create-campaign-sms`).forEach(item => item.onclick = () => {
            window.location.href = '/create-campaign-sms.html'
        })
    }
    if (document.querySelector(`.cmp-from-template-item-messenger`)) {
        document.querySelectorAll(`.cmp-from-template-item-messenger`).forEach(item => item.onclick = () => {
            window.location.href = '/create-campaign-messenger.html'
        })
    }
    if (document.querySelector(`#cmp-create-campaign-messenger`)) {
        document.querySelectorAll(`#cmp-create-campaign-messenger`).forEach(item => item.onclick = () => {
            window.location.href = '/create-campaign-messenger.html'
        })
    }
    // TOGGLE CHAT ON MOBILE
    if (document.querySelector(`.cmp-chats-item`)) {
        document.querySelectorAll(`.cmp-chats-item`).forEach(item => {
            if (item.classList.contains(`groups-chats-item`)) return true
            if (window.innerWidth < 661) item.onclick = e => document.querySelector(`#cmp-chat`).style.display = `flex`
        })
    }
    if (document.querySelector(`.cmp-chat-header .back-to-chat`)) {
        document.querySelector(`.cmp-chat-header .back-to-chat`).onclick = e => {
            document.querySelector(`#cmp-chat`).style.display = `none`
        }
    }

    //
    // create from scratch toggles
    if (document.querySelector(`#cmp-create-from-scratch-to-step-2`)) {
        document.querySelector(`#cmp-create-from-scratch-to-step-2`).onclick = () => {
            $('.create-campaign-step.active')
                .removeClass('active')
                .addClass('completed')
                .next('.create-campaign-step')
                .addClass('active');
            document.querySelector(`#cmp-create-from-scratch-step-1-footer`).classList.remove(`current`)
            document.querySelector(`#cmp-create-from-scratch-step-2-footer`).classList.add(`current`)
        }
    }
    if (document.querySelector(`#cmp-create-from-scratch-to-step-1`)) {
        document.querySelector(`#cmp-create-from-scratch-to-step-1`).onclick = () => {
            document.querySelector(`#cmp-create-from-scratch-step-2`).classList.remove(`current`)
            document.querySelector(`#cmp-create-from-scratch-step-1`).classList.add(`current`)
            document.querySelector(`#cmp-create-from-scratch-step-2-footer`).classList.remove(`current`)
            document.querySelector(`#cmp-create-from-scratch-step-1-footer`).classList.add(`current`)
        }
    }
    if (document.querySelector(`#cmp-create-from-scratch-toggle`)) {
        document.querySelector(`#cmp-create-from-scratch-toggle`).onclick = () => {
            document.querySelector(`#cmp-create-from-scratch`).classList.add(`shown`)
            document.querySelector(`#cmp-chats`).classList.add(`hidden`)
            document.querySelector(`#cmp-chat`).classList.add(`hidden`)
            document.querySelector(`#email-view-1`).classList.remove(`shown`)
        }
    }
    if (document.querySelector(`[data-id="cmp-close-create-from-scratch"]`)) {
        document.querySelectorAll(`[data-id="cmp-close-create-from-scratch"]`).forEach(btn => {
            btn.onclick = () => {
                document.querySelector(`#cmp-create-from-scratch`).classList.remove(`shown`)
                document.querySelector(`#cmp-chats`).classList.remove(`hidden`)
                document.querySelector(`#cmp-chat`).classList.remove(`hidden`)
            }
        })
    }
    // create new segment toggle
    if (document.querySelector(`#create-new-segment-toggle`)) {
        document.querySelector(`#create-new-segment-toggle`).onclick = () => {
            document.querySelector(`#create-new-segment`).classList.add(`shown`)
            document.querySelector(`.cmp-create-from-scrath-item-controls-input`).classList.add(`collapsed`)
            document.querySelector(`.cmp-create-from-scrath-item-controls-button`).classList.add(`collapsed`)
        }
    }
    if (document.querySelector(`#create-new-segment-close`)) {
        document.querySelector(`#create-new-segment-close`).onclick = () => {
            document.querySelector(`#create-new-segment`).classList.remove(`shown`)
            document.querySelector(`.cmp-create-from-scrath-item-controls-input`).classList.remove(`collapsed`)
            document.querySelector(`.cmp-create-from-scrath-item-controls-button`).classList.remove(`collapsed`)
        }
    }
    if (document.querySelector(`#create-new-segment-submit`)) {
        document.querySelector(`#create-new-segment-submit`).onclick = e => {
            e.preventDefault()
            document.querySelector(`#create-new-segment`).classList.remove(`shown`)
            document.querySelector(`.cmp-create-from-scrath-item-controls-input`).classList.remove(`collapsed`)
            document.querySelector(`.cmp-create-from-scrath-item-controls-button`).classList.remove(`collapsed`)
        }
    }
    // TOGGLE SUGGESTIOn
    if (document.querySelector(`#open-suggestions`)) {
        document.querySelector(`#open-suggestions`).onclick = () => document.querySelector(`#suggestions`).style.display = `block`
        document.addEventListener(`click`, e => {
            if (!e.target.closest(`#open-suggestions`) && !e.target.closest(`#suggestions`)) {
                document.querySelector(`#suggestions`).style.display = `none`
            }
        })
    }
    if (document.querySelector(`#cmp-close-suggestions`)) {
        document.querySelector(`#cmp-close-suggestions`).onclick = () => document.querySelector(`#suggestions`).style.display = `none`
    }
    // close cmp chat
    if (document.querySelector(`#cmp-close-chat`)) {
        document.querySelector(`#cmp-close-chat`).onclick = () => document.querySelector(`#cmp-chat`).style.display = `none`
    }
    // open send cmp
    if (document.querySelector(`#cmp-send`)) document.querySelector(`#cmp-send`).onclick = openPopup
    if (document.querySelector(`#cmp-send-popup`)) document.querySelector(`#cmp-send-popup`).onclick = checkClosePopup
    if (document.querySelector(`#cmp-send-cancel`)) document.querySelector(`#cmp-send-cancel`).onclick = closePopupByButton
    if (document.querySelector(`#cmp-send-confirm`)) document.querySelector(`#cmp-send-confirm`).onclick = closePopupByButton
    // open test cmp
    if (document.querySelector(`#cmp-test`)) document.querySelector(`#cmp-test`).onclick = openPopup
    if (document.querySelector(`#cmp-test-popup`)) document.querySelector(`#cmp-test-popup`).onclick = checkClosePopup
    if (document.querySelector(`#cmp-test-cancel`)) document.querySelector(`#cmp-test-cancel`).onclick = closePopupByButton
    if (document.querySelector(`#cmp-test-confirm`)) document.querySelector(`#cmp-test-confirm`).onclick = closePopupByButton
    //-----------------------------------------//
    $(function () {
        $(".pipeline-column-list").sortable({
            connectWith: ".pipeline-column-list",
            appendTo: "body",
            helper: "clone",
            placeholder: "dragging",
            start: function (e, ui) {
                ui.placeholder.height(`107px`)
                ui.placeholder.css('visibility', 'visible')
                ui.placeholder.css(`background-color`, `#f9f9f9`)
                ui.placeholder.css(`border`, `1px solid #EEEEEE`)
                ui.placeholder.css(`border-radius`, `10px`)
                ui.placeholder.css(`margin-bottom`, `14px`)
            },
            sort: (event, ui) => {
                $('body > .pipeline-column-item').addClass(`dragging`)
            },
        }).disableSelection();
    });
});//document ready

removeTaskPopup = e => {
    document.querySelector(`#remove-task`).setAttribute(`data-task`, e.currentTarget.closest(`.leads-table-row.tasks`).dataset.id)
    document.querySelector(`#remove-task`).classList.add(`opened`)
}

removeLeadPopup = e => {
    document.querySelector(`#remove-lead`).setAttribute(`data-lead`, e.currentTarget.closest(`.leads-table-row`).dataset.id)
    document.querySelector(`#remove-lead`).classList.add(`opened`)
}

checkselectedChecks = () => {
    // const checked = Array.from(document.querySelectorAll(`.leads-table-row .custom-checkbox-hiden`)).some(check => check.checked)
    // const merge = document.querySelector(`#merge-leads-toggle`)
    // const task = document.querySelector(`#toggle-add-task`)

    // if (checked) {
    //     merge.disabled = false
    //     task.disabled = false
    // } else {
    //     merge.disabled = true
    //     task.disabled = true
    // }
}

toggleLeadRow = e => {
    e.target.checked ? e.target.closest(`.leads-table-row`).classList.add(`checked`) : e.target.closest(`.leads-table-row`).classList.remove(`checked`)
    checkselectedChecks()
}
toggleNotesList = e => {
    // const lists = document.querySelectorAll(`.leads-table-notes-list`)
    // const buttons = document.querySelectorAll(`.leads-table-td.leads-table-notes svg`)

    // if (e.currentTarget.classList.contains(`opened`)) {
    //     lists.forEach(e => e.classList.remove(`shown`))
    //     buttons.forEach(e => e.classList.remove(`opened`))

    //     return false
    // }

    // if (window.innerWidth < 661) document.body.style.overflow = `hidden`
    // lists.forEach(e => e.classList.remove(`shown`))
    // buttons.forEach(e => e.classList.remove(`opened`))
    // e.currentTarget.classList.add(`opened`)
    // e.currentTarget.closest(`.leads-table-notes`).querySelector(`.leads-table-notes-list`).classList.add(`shown`)
}

closeNotesList = () => {
    document.querySelectorAll(`.leads-table-notes-list`).forEach(e => e.classList.remove(`shown`))
    document.querySelectorAll(`.leads-table-td.leads-table-notes svg`).forEach(e => e.classList.remove(`opened`))
    document.body.style.overflow = `auto`
}

openPopup = e => {
    const popup = document.querySelector(`#${e.currentTarget.getAttribute(`data-id`)}`)

    popup.classList.add(`opened`)
    document.body.style.overflow = `hidden`

    // if (popup.querySelector(`.popup-center`)) {
    //     if (popup.querySelector(`.popup-center`).scrollHeight > window.innerHeight) {
    //         popup.querySelector(`.popup-center`).style.height = `100vh`
    //         popup.querySelector(`.popup-center`).style.overflowY = `auto`
    //     } else {
    //         popup.querySelector(`.popup-center`).style.height = `auto`;
    //     }
    // }

    // if (popup.querySelector(`.popup-right`)) {
    //     if (popup.querySelector(`.popup-right`).scrollHeight > window.innerHeight) {
    //         popup.querySelector(`.popup-right`).style.height = `100vh`
    //         popup.querySelector(`.popup-right`).style.overflowY = `auto`
    //     } else {
    //         // popup.querySelector(`.popup-center`).style.height = auto;
    //     }
    // }

}

closePopup = id => {
    document.querySelector(`#${id}`).classList.remove(`opened`)
    document.body.style.overflow = `auto`

    if (id === `add-new-lead`) showAddLeadSuccess()
}

closePopupByButton = e => {
    closePopup(e.currentTarget.closest(`.popup`).getAttribute(`id`))
    e.preventDefault()
}

checkClosePopup = e => !e.target.closest(`.popup-right`) && !e.target.closest(`.popup-center`) ? closePopup(e.currentTarget.getAttribute(`id`)) : true

uploadLeadCSV = e => {
    e.currentTarget.closest(`.popup-right-file`).classList.add(`uploaded`)
    e.currentTarget.closest(`.label`).querySelector(`.title`).innerText = `Import success`
}

uploadTaskFile = e => {
    e.currentTarget.closest(`.popup-center-file`).classList.add(`uploaded`)
    e.currentTarget.closest(`.label`).querySelector(`.title`).innerText = `Import success`
}

showAddLeadSuccess = () => {
    const message = document.querySelector(`#add-lead-success`)

    message.style.display = `flex`

    setTimeout(() => {
        message.style.display = `none`
    }, 15000)
}

toggleAccord = e => {
    const head = e.currentTarget
    const parent = head.closest(`.accord`)
    const body = parent.querySelector(`.accord-body`)

    if (!head.classList.contains(`opened`)) {
        head.classList.add(`opened`)
        body.style.height = body.scrollHeight + `px`
    } else {
        head.classList.remove(`opened`)
        body.style.height = 0
    }
}

showSearchLeadResult = e => e.target.closest(`.merge-leads-form-search`).querySelector(`.lead-search-result`).style.display = `block`

hideSearchLeadResult = e => setTimeout(() => e.target.closest(`.merge-leads-form-search`).querySelector(`.lead-search-result`).style.display = `none`, 150)

showFoundLead = () => {
    document.querySelector(`.found-lead`).style.display = `flex`
    document.querySelector(`.merge-leads-submit`).disabled = false
}

showSuccessMere = e => {
    document.querySelector(`.merge-leads-submit`).classList.add(`success`)
    document.querySelector(`.merge-leads-submit .blue-button-title`).innerHTML = `Leads merged`
    e.preventDefault()
}

toggleSnooze = e => e.target === e.currentTarget ? e.currentTarget.classList.toggle(`opened`) : true

uploadTaskFileOnPage = e => e.currentTarget.closest(`.popup-center-file`).classList.add(`show-list`)

toggleProfileTabs = e => {
    document.querySelectorAll(`.profile-body-item`).forEach(e => e.style.display = `none`)
    if (document.querySelector(`.cmp-create-from-scratch-item-segments`)) {
        document.querySelectorAll(`.cmp-create-from-scratch-item-segments`).forEach(e => e.style.display = `none`)
    }
    if (document.querySelector(`.cmp-email-view-attachment`)) {
        document.querySelectorAll(`.cmp-email-view-attachment`).forEach(e => e.style.display = `none`)
    }
    document.querySelectorAll(`.profile-body-item`).forEach(e => e.style.display = `none`)
    document.querySelectorAll(`.profile-top-tab`).forEach(e => e.classList.remove(`selected`))

    e.currentTarget.classList.add(`selected`)
    document.querySelector(`#${e.currentTarget.getAttribute(`data-id`)}`).style.display = `block`
}

toggleProfile = () => document.querySelector(`#chat-popup`).classList.toggle(`show-profile`)

closeProfile = () => document.querySelector(`#chat-popup`).classList.remove(`show-profile`)

dragStart = event => {
    //console.log(event)
    event.currentTarget.classList.add('dragging')
}

dragEnd = event => {
    event.currentTarget.classList.remove('dragging')
}

drag = event => {
    event.dataTransfer.setData('text/html', event.currentTarget.outerHTML)
    event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id)
}

drop = event => {
    document.querySelectorAll('.column').forEach(column => column.classList.remove('drop'));
    document.querySelector(`[data-id="${event.dataTransfer.getData('text/plain')}"]`).remove();

    event.currentTarget.innerHTML = event.currentTarget.innerHTML + event.dataTransfer.getData('text/html');
};

allowDrop = event => {
    event.preventDefault();
};


// groups
document.addEventListener("DOMContentLoaded", () => {
    // open mobile chat
    if (document.querySelector(`.groups-chats-item`)) {
        document.querySelectorAll(`.groups-chats-item`).forEach(item => {
            item.onclick = () => {
                if (window.innerWidth < 661) document.querySelector(`#groups-chat`).style.display = `flex`
            }
        })
    }
    // close mobile chat
    if (document.querySelector(`#groups-header-back`)) {
        document.querySelector(`#groups-header-back`).onclick = e => {
            e.preventDefault()
            if (window.innerWidth < 661) document.querySelector(`#groups-chat`).style.display = `none`
        }
    }
    // toggle footer select
    const groupsFooterSelect = document.querySelector(`#groups-footer-select`)
    if (groupsFooterSelect) {
        groupsFooterSelect.onclick = e => {
            // e.preventDefault()
            // e.stopPropagation()
            groupsFooterSelect.classList.toggle(`open`)
        }

        document.addEventListener(`click`, e => {
            if (!e.target.closest(`#groups-footer-select`)) groupsFooterSelect.classList.remove(`open`)
        })
    }
    // toggle create new group
    const createNewGroupToggle = document.querySelector(`#create-new-group-toggle`)
    if (createNewGroupToggle) {
        createNewGroupToggle.onclick = () => {
            document.querySelector(`.sidebar-site`).classList.add(`collapse`)
            document.querySelector(`.main-site`).classList.add(`sidebar-collapse`)
            document.querySelector(`#create-new-group`).classList.add(`shown`)
            document.querySelector(`#groups-audience`).classList.remove(`shown`)
            document.querySelector(`#groups-add-customer`).classList.remove(`shown`)
            document.querySelector(`#groups-create-customer`).classList.remove(`shown`)
            document.querySelector(`#groups-add-csv`).classList.remove(`shown`)
            document.querySelector(`.groups-header-tabs`).style.display = `flex`
        }
    }
    // close create new group
    const closeCreateNewGroup = document.querySelectorAll(`[data-id="close-new-group"]`)
    if (closeCreateNewGroup.length > 0) {
        closeCreateNewGroup.forEach(el => el.onclick = () => {
            document.querySelector(`.sidebar-site`).classList.remove(`collapse`)
            document.querySelector(`.main-site`).classList.remove(`sidebar-collapse`)
            document.querySelector(`#create-new-group`).classList.remove(`shown`)
        })
    }
    // hide criteria row items (temporary)
    if (window.innerWidth < 992) {
        const rows = document.querySelectorAll(`.create-new-group-criteria-row`)
        rows.forEach(row => {
            const items = row.querySelectorAll(`.create-new-group-criteria-item`)

            for (let i = 3; i < items.length; i++) {
                items[i].remove()
            }
        })
    }
    // show groups audience
    const groupsAudienceToggle = document.querySelector(`#groups-audience-toggle`)
    if (groupsAudienceToggle) groupsAudienceToggle.onclick = e => {
        if (e.target.closest(`#groups-header-back`)) return true
        document.querySelector(`#groups-audience`).classList.add(`shown`)
        document.querySelector(`.groups-header-tabs`).style.display = `none`
    }
    // close groups audience
    const groupsAudienceClose = document.querySelector(`#groups-audience-close`)
    if (groupsAudienceClose) groupsAudienceClose.onclick = () => {
        document.querySelector(`#groups-audience`).classList.remove(`shown`)
        document.querySelector(`.groups-header-tabs`).style.display = `flex`
    }
    // delete audience item
    const groupsAudienceItems = document.querySelectorAll(`.groups-audience-item-button`)
    if (groupsAudienceItems.length > 0) {
        groupsAudienceItems.forEach(item => {
            item.onclick = () => {
                item.closest(`.groups-audience-item`).classList.add(`deleted`)
            }
        })
    }
    // add customer
    const groupsAddCustomerItem = document.querySelectorAll(`.groups-add-customer-item-button`)
    groupsAddCustomerItem.forEach(item => item.onclick = () => {
        const parent = item.closest(`.groups-add-customer-item`)
        parent.classList.toggle(`added`)
        if (parent.classList.contains(`added`)) {
            item.innerText = `Added`
        } else {
            item.innerText = `+ Add`
        }
    })
    // open add customer
    const groupsAddCustomerOpen = document.querySelector(`#groups-add-customer-open`)
    if (groupsAddCustomerOpen) {
        groupsAddCustomerOpen.onclick = () => {
            document.querySelector(`#groups-audience`).classList.remove(`shown`)
            document.querySelector(`#groups-add-customer`).classList.add(`shown`)
        }
    }
    // close add customer
    const groupsAddCustomerClose = document.querySelector(`#groups-add-customer-close`)
    if (groupsAddCustomerClose) {
        groupsAddCustomerClose.onclick = () => {
            document.querySelector(`#groups-audience`).classList.add(`shown`)
            document.querySelector(`#groups-add-customer`).classList.remove(`shown`)
        }
    }
    // open create customer
    const groupsCreateCustomerOpen = document.querySelector(`#groups-create-customer-open`)
    if (groupsCreateCustomerOpen) {
        groupsCreateCustomerOpen.onclick = () => {
            document.querySelector(`#groups-create-customer`).classList.add(`shown`)
            document.querySelector(`#groups-add-customer`).classList.remove(`shown`)
        }
    }
    // close create customer
    const groupsCreateCustomerClose = document.querySelector(`#groups-create-customer-close`)
    if (groupsCreateCustomerClose) {
        groupsCreateCustomerClose.onclick = () => {
            document.querySelector(`#groups-add-customer`).classList.add(`shown`)
            document.querySelector(`#groups-create-customer`).classList.remove(`shown`)
        }
    }
    // open add csv
    const groupsAddCsvOpen = document.querySelector(`#groups-add-csv-open`)
    if (groupsAddCsvOpen) {
        groupsAddCsvOpen.onclick = () => {
            document.querySelector(`#groups-audience`).classList.remove(`shown`)
            document.querySelector(`#groups-add-csv`).classList.add(`shown`)
        }
    }
    // close add csv
    const groupsAddCsvClose = document.querySelector(`#groups-add-csv-close`)
    if (groupsAddCsvClose) {
        groupsAddCsvClose.onclick = () => {
            document.querySelector(`#groups-audience`).classList.add(`shown`)
            document.querySelector(`#groups-add-csv`).classList.remove(`shown`)
        }
    }
    // open filter
    const grouspFilterOpen = document.querySelector(`#groups-filter-open`)
    if (grouspFilterOpen) {
        grouspFilterOpen.onclick = () => {
            document.querySelector(`#groups-chats`).style.display = `none`
            document.querySelector(`#groups-filter`).classList.add(`shown`)
        }
    }
    // close filter
    const grouspFilterClose = document.querySelector(`#groups-filter-close`)
    if (grouspFilterClose) {
        grouspFilterClose.onclick = () => {
            document.querySelector(`#groups-chats`).style.display = `flex`
            document.querySelector(`#groups-filter`).classList.remove(`shown`)
        }
    }
    // toggle groups
    const groupsTabs = document.querySelector(`#groups-tabs`)
    if (groupsTabs) {
        groupsTabs.querySelectorAll(`.chat-header-tab`).forEach(tab => {
            tab.onclick = () => {
                groupsTabs.querySelectorAll(`.chat-header-tab`).forEach(e => e.classList.remove(`current`))
                tab.classList.add(`current`)
                document.querySelectorAll(`.cmp-chat-message`).forEach(avatar => avatar.classList.remove(`all`))
                if (tab.classList.contains(`all`)) {
                    document.querySelectorAll(`.cmp-chat-message`).forEach(avatar => avatar.classList.add(`all`))
                }
            }
        })
    }
    // show send message
    const groupsFooter = document.querySelector(`#groups-send-toggle`)
    if (groupsFooter) {
        groupsFooter.onclick = e => {
            //console.log(document.querySelector(`#groups-send`))
            document.querySelector(`#send-groups`).classList.add(`opened`)
        }
    }
});
