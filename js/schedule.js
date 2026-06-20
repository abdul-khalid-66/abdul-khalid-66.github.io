/* ===================================================================
   SKOOLYST PORTFOLIO — DAILY SCHEDULE CALENDAR (jQuery)
   -------------------------------------------------------------------
   Reads the `scheduleData` array from js/schedule-data.js and renders
   a responsive monthly calendar inside #scheduleCalendar. Clicking a
   date that has one or more entries opens a modal with the details.

   You should not need to edit this file — to add/change daily
   entries, edit js/schedule-data.js instead.
   =================================================================== */

$(function () {

    /* ---------- Category colors & icons ---------- */
    var CATEGORY_META = {
        "Learning":   { color: "#4e7df9", icon: "fa-graduation-cap" },
        "Experience": { color: "#21b573", icon: "fa-briefcase" },
        "Meeting":    { color: "#f4a623", icon: "fa-users" },
        "Event":      { color: "#e85d75", icon: "fa-star" },
        "Task":       { color: "#9b59f5", icon: "fa-check-circle" },
        "Default":    { color: "#8a8a8a", icon: "fa-circle" }
    };

    var WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var MONTHS = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

    var $cal      = $("#scheduleCalendar");
    var $overlay  = $("#scheduleModalOverlay");
    var $modalBox = $("#scheduleModalContent");

    if (!$cal.length) return;

    /* ---------- Group raw data by date ---------- */
    var rawData = (typeof scheduleData !== "undefined" && Array.isArray(scheduleData)) ? scheduleData : [];
    var eventsByDate = {};
    rawData.forEach(function (item) {
        if (!item || !item.date) return;
        if (!eventsByDate[item.date]) eventsByDate[item.date] = [];
        eventsByDate[item.date].push(item);
    });

    var today = new Date();
    var todayKey = formatKey(today.getFullYear(), today.getMonth(), today.getDate());
    var viewYear = today.getFullYear();
    var viewMonth = today.getMonth();

    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    function formatKey(y, m, d) { return y + "-" + pad(m + 1) + "-" + pad(d); }
    function categoryMeta(cat) { return CATEGORY_META[cat] || CATEGORY_META["Default"]; }
    function escapeHtml(str) {
        return String(str == null ? "" : str)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    /* ---------- Build legend (only categories actually used + defaults) ---------- */
    function renderLegend() {
        var used = {};
        rawData.forEach(function (item) { used[item.category || "Default"] = true; });
        // Always show the 5 standard categories so the legend stays consistent
        ["Learning", "Experience", "Meeting", "Event", "Task"].forEach(function (c) { used[c] = true; });

        var html = "";
        Object.keys(used).forEach(function (cat) {
            var meta = categoryMeta(cat);
            html += '<span class="schedule-legend-item">' +
                        '<span class="schedule-legend-dot" style="background:' + meta.color + '"></span>' +
                        escapeHtml(cat) +
                    '</span>';
        });
        return html;
    }

    /* ---------- Render the full calendar for a given month/year ---------- */
    function renderCalendar(year, month) {

        var firstDayIndex = new Date(year, month, 1).getDay();      // 0=Sun
        var daysInMonth    = new Date(year, month + 1, 0).getDate();
        var prevMonthDays  = new Date(year, month, 0).getDate();
        var totalCells     = Math.ceil((firstDayIndex + daysInMonth) / 7) * 7;

        var weekdaysHtml = WEEKDAYS.map(function (d) {
            return '<span>' + d + '</span>';
        }).join("");

        var cellsHtml = "";
        for (var i = 0; i < totalCells; i++) {
            var dayNum = i - firstDayIndex + 1;

            if (dayNum < 1) {
                // trailing days of previous month
                cellsHtml += '<div class="schedule-cal-cell other-month"><span class="date-num">' +
                              (prevMonthDays + dayNum) + '</span></div>';
            } else if (dayNum > daysInMonth) {
                // leading days of next month
                cellsHtml += '<div class="schedule-cal-cell other-month"><span class="date-num">' +
                              (dayNum - daysInMonth) + '</span></div>';
            } else {
                var dateKey = formatKey(year, month, dayNum);
                var items = eventsByDate[dateKey] || [];
                var isToday = dateKey === todayKey;
                var hasEvents = items.length > 0;

                var cls = "schedule-cal-cell";
                if (isToday) cls += " is-today";
                if (hasEvents) cls += " has-event";

                var dotsHtml = "";
                var labelHtml = "";
                if (hasEvents) {
                    var visibleDots = items.slice(0, 3);
                    var dotsInner = visibleDots.map(function (it) {
                        var meta = categoryMeta(it.category);
                        return '<span class="schedule-cal-dot" style="background:' + meta.color + '" title="' + escapeHtml(it.category) + '"></span>';
                    }).join("");
                    if (items.length > 3) {
                        dotsInner += '<span class="schedule-cal-more">+' + (items.length - 3) + '</span>';
                    }
                    dotsHtml = '<span class="schedule-cal-dots">' + dotsInner + '</span>';
                    labelHtml = '<span class="event-label">' + escapeHtml(items[0].title) + '</span>';
                }

                cellsHtml += '<div class="' + cls + '" data-date="' + dateKey + '">' +
                                '<span class="date-num">' + dayNum + '</span>' +
                                labelHtml +
                                dotsHtml +
                             '</div>';
            }
        }

        var headerHtml =
            '<div class="schedule-cal-header">' +
                '<div class="schedule-cal-title">' + MONTHS[month] + ' ' + year + '</div>' +
                '<div class="schedule-cal-nav">' +
                    '<button type="button" class="schedule-cal-btn schedule-prev" aria-label="Previous month"><i class="fa fa-chevron-left"></i></button>' +
                    '<button type="button" class="schedule-cal-today-btn">Today</button>' +
                    '<button type="button" class="schedule-cal-btn schedule-next" aria-label="Next month"><i class="fa fa-chevron-right"></i></button>' +
                '</div>' +
            '</div>' +
            '<div class="schedule-cal-legend">' + renderLegend() + '</div>' +
            '<div class="schedule-cal-weekdays">' + weekdaysHtml + '</div>' +
            '<div class="schedule-cal-grid">' + cellsHtml + '</div>';

        $cal.html(headerHtml);
    }

    /* ---------- Modal ---------- */
    function openModal(dateKey) {
        var items = eventsByDate[dateKey];
        if (!items || !items.length) return;

        var dateObj = new Date(dateKey + "T00:00:00");
        var niceDate = dateObj.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

        var html = '<div class="schedule-modal-date">' + niceDate + '</div>';

        items.forEach(function (item) {
            var meta = categoryMeta(item.category);
            html += '<div class="schedule-modal-entry">' +
                        '<span class="schedule-modal-badge" style="background:' + meta.color + '">' +
                            '<i class="fa ' + meta.icon + '"></i> ' + escapeHtml(item.category || "Activity") +
                        '</span>' +
                        '<h3 class="schedule-modal-title">' + escapeHtml(item.title) + '</h3>' +
                        '<p class="schedule-modal-desc">' + escapeHtml(item.description) + '</p>';

            if (item.tags && item.tags.length) {
                html += '<div class="schedule-modal-tags">' +
                            item.tags.map(function (t) { return '<span class="schedule-modal-tag">' + escapeHtml(t) + '</span>'; }).join("") +
                        '</div>';
            }

            if (item.link && item.link.url) {
                html += '<a class="schedule-modal-link" href="' + escapeHtml(item.link.url) + '" target="_blank" rel="noopener noreferrer">' +
                            escapeHtml(item.link.label || "View link") + ' <i class="fa fa-external-link-alt"></i>' +
                        '</a>';
            }

            html += '</div>';
        });

        $modalBox.html(html);
        $overlay.addClass("active").attr("aria-hidden", "false");
        $("body").css("overflow", "hidden");
    }

    function closeModal() {
        $overlay.removeClass("active").attr("aria-hidden", "true");
        $("body").css("overflow", "");
    }

    /* ---------- Events ---------- */
    $cal.on("click", ".schedule-cal-cell.has-event", function () {
        openModal($(this).data("date"));
    });

    $cal.on("click", ".schedule-prev", function () {
        viewMonth--;
        if (viewMonth < 0) { viewMonth = 11; viewYear--; }
        renderCalendar(viewYear, viewMonth);
    });

    $cal.on("click", ".schedule-next", function () {
        viewMonth++;
        if (viewMonth > 11) { viewMonth = 0; viewYear++; }
        renderCalendar(viewYear, viewMonth);
    });

    $cal.on("click", ".schedule-cal-today-btn", function () {
        viewYear = today.getFullYear();
        viewMonth = today.getMonth();
        renderCalendar(viewYear, viewMonth);
    });

    $("#scheduleModalClose").on("click", closeModal);
    $overlay.on("click", function (e) {
        if (e.target === this) closeModal();
    });
    $(document).on("keyup", function (e) {
        if (e.key === "Escape") closeModal();
    });

    /* ---------- Init ---------- */
    renderCalendar(viewYear, viewMonth);

});
