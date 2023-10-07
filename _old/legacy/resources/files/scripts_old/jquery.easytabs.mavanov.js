/*
 * jQuery EasyTabs plugin 3.2.0-modified
 *
 * Copyright (c) 2010-2011 Steve Schwartz (JangoSteve)
 *
 * Marien van Overbeek
 */
(function ($) {
  $.easytabs = function (container, options) {
    var plugin = this,
      $container = $(container),
      defaults = {
        animate: true,
        panelActiveClass: "active",
        tabActiveClass: "active",
        defaultTab: "li:first-child",
        animationSpeed: "normal",
        tabs: "> ul > li",
        updateHash: true,
        cycle: false,
        collapsible: false,
        collapsedClass: "collapsed",
        collapsedByDefault: true,
        uiTabs: false,
        transitionIn: "fadeIn",
        transitionOut: "fadeOut",
        transitionInEasing: "swing",
        transitionOutEasing: "swing",
        transitionCollapse: "slideUp",
        transitionUncollapse: "slideDown",
        transitionCollapseEasing: "swing",
        transitionUncollapseEasing: "swing",
        containerClass: "",
        tabsClass: "",
        tabClass: "",
        panelClass: "",
        cache: true,
        event: "click",
        panelContext: $container,
      },
      $defaultTab,
      $defaultTabLink,
      transitions,
      lastHash,
      skipUpdateToHash,
      animationSpeeds = {
        fast: 200,
        normal: 400,
        slow: 600,
      },
      settings;

    // =============================================================
    // Functions available via easytabs object
    // =============================================================

    plugin.init = function () {
      plugin.settings = settings = $.extend({}, defaults, options);
      settings.bind_str = settings.event + ".easytabs";

      if (settings.uiTabs) {
        settings.tabActiveClass = "ui-tabs-selected";
        settings.containerClass =
          "ui-tabs ui-widget ui-widget-content ui-corner-all";
        settings.tabsClass =
          "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all";
        settings.tabClass = "ui-state-default ui-corner-top";
        settings.panelClass =
          "ui-tabs-panel ui-widget-content ui-corner-bottom";
      }

      if (
        settings.collapsible &&
        options.defaultTab !== undefined &&
        options.collpasedByDefault === undefined
      ) {
        settings.collapsedByDefault = false;
      }

      if (typeof settings.animationSpeed === "string") {
        settings.animationSpeed = animationSpeeds[settings.animationSpeed];
      }

      $("a.anchor").remove().prependTo("body");
      $container.data("easytabs", {});
      plugin.setTransitions();
      plugin.getTabs();
      addClasses();
      setDefaultTab();
      bindToTabClicks();
      initHashChange();
      initCycle();
      $container.attr("data-easytabs", true);
    };

    plugin.setTransitions = function () {
      transitions = settings.animate
        ? {
            show: settings.transitionIn,
            hide: settings.transitionOut,
            speed: settings.animationSpeed,
            collapse: settings.transitionCollapse,
            uncollapse: settings.transitionUncollapse,
            halfSpeed: settings.animationSpeed / 2,
          }
        : {
            show: "show",
            hide: "hide",
            speed: 0,
            collapse: "hide",
            uncollapse: "show",
            halfSpeed: 0,
          };
    };

    plugin.getTabs = function () {
      var $matchingPanel;

      (plugin.tabs = $container.find(settings.tabs)),
        (plugin.panels = $()),
        plugin.tabs.each(function () {
          var $tab = $(this),
            $a = $tab.children("a"),
            targetId = $tab.children("a").data("target");
          $tab.data("easytabs", {});

          var $tmp_a = $a.attr("href").replace("/", "#").replace("/", "_");
          $tmp_a = $tmp_a == "#" ? "#profiel" : $tmp_a;

          if (targetId !== undefined && targetId !== null) {
            $tab.data("easytabs").ajax = $tmp_a;
          } else {
            targetId = $tmp_a;
          }
          targetId = targetId.match(/#([^\?]+)/)[1];

          $matchingPanel = settings.panelContext.find("#" + targetId);

          if ($matchingPanel.length) {
            $matchingPanel.data("easytabs", {
              position: $matchingPanel.css("position"),
              visibility: $matchingPanel.css("visibility"),
            });
            $matchingPanel.not(settings.panelActiveClass).hide();
            plugin.panels = plugin.panels.add($matchingPanel);
            $tab.data("easytabs").panel = $matchingPanel;
          } else {
            plugin.tabs = plugin.tabs.not($tab);
            if ("console" in window) {
              console.warn(
                "Warning: tab without matching panel for selector '#" +
                  targetId +
                  "' removed from set",
              );
            }
          }
        });
    };

    plugin.selectTab = function ($clicked, callback) {
      var url = window.location,
        hash = url.hash.match(/^[^\?]*/)[0],
        $targetPanel = $clicked.parent().data("easytabs").panel,
        ajaxUrl = $clicked.parent().data("easytabs").ajax;

      if (
        settings.collapsible &&
        !skipUpdateToHash &&
        ($clicked.hasClass(settings.tabActiveClass) ||
          $clicked.hasClass(settings.collapsedClass))
      ) {
        plugin.toggleTabCollapse($clicked, $targetPanel, ajaxUrl, callback);
      } else if (
        !$clicked.hasClass(settings.tabActiveClass) ||
        !$targetPanel.hasClass(settings.panelActiveClass)
      ) {
        activateTab($clicked, $targetPanel, ajaxUrl, callback);
      } else if (!settings.cache) {
        activateTab($clicked, $targetPanel, ajaxUrl, callback);
      }
    };

    plugin.toggleTabCollapse = function (
      $clicked,
      $targetPanel,
      ajaxUrl,
      callback,
    ) {
      plugin.panels.stop(true, true);

      if (
        fire($container, "easytabs:before", [$clicked, $targetPanel, settings])
      ) {
        plugin.tabs
          .filter("." + settings.tabActiveClass)
          .removeClass(settings.tabActiveClass)
          .children()
          .removeClass(settings.tabActiveClass);

        if ($clicked.hasClass(settings.collapsedClass)) {
          if (
            ajaxUrl &&
            (!settings.cache || !$clicked.parent().data("easytabs").cached)
          ) {
            $container.trigger("easytabs:ajax:beforeSend", [
              $clicked,
              $targetPanel,
            ]);

            $targetPanel.load(ajaxUrl, function (response, status, xhr) {
              $clicked.parent().data("easytabs").cached = true;
              $container.trigger("easytabs:ajax:complete", [
                $clicked,
                $targetPanel,
                response,
                status,
                xhr,
              ]);
            });
          }

          $clicked
            .parent()
            .removeClass(settings.collapsedClass)
            .addClass(settings.tabActiveClass)
            .children()
            .removeClass(settings.collapsedClass)
            .addClass(settings.tabActiveClass);

          $targetPanel
            .addClass(settings.panelActiveClass)
            [transitions.uncollapse](
              transitions.speed,
              settings.transitionUncollapseEasing,
              function () {
                $container.trigger("easytabs:midTransition", [
                  $clicked,
                  $targetPanel,
                  settings,
                ]);
                if (typeof callback == "function") callback();
              },
            );
        } else {
          $clicked
            .addClass(settings.collapsedClass)
            .parent()
            .addClass(settings.collapsedClass);

          $targetPanel
            .removeClass(settings.panelActiveClass)
            [transitions.collapse](
              transitions.speed,
              settings.transitionCollapseEasing,
              function () {
                $container.trigger("easytabs:midTransition", [
                  $clicked,
                  $targetPanel,
                  settings,
                ]);
                if (typeof callback == "function") callback();
              },
            );
        }
      }
    };

    plugin.matchTab = function (hash) {
      return plugin.tabs
        .find("[href='" + hash + "'],[data-target='" + hash + "']")
        .first();
    };
    plugin.matchInPanel = function (hash) {
      return hash && plugin.validId(hash)
        ? plugin.panels.filter(":has(" + hash + ")").first()
        : [];
    };
    plugin.validId = function (id) {
      return id.substr(1).match(/^[A-Za-z]+[A-Za-z0-9\-_:\.].$/);
    };
    plugin.selectTabFromHashChange = function () {
      var hash = window.location.hash.match(/^[^\?]*/)[0],
        $tab = plugin.matchTab(hash),
        $panel;

      if (settings.updateHash) {
        if ($tab.length) {
          skipUpdateToHash = true;
          plugin.selectTab($tab);
        } else {
          $panel = plugin.matchInPanel(hash);

          if ($panel.length) {
            hash = "#" + $panel.attr("id");
            console.log("h 320: " + hash);
            $tab = plugin.matchTab(hash);
            skipUpdateToHash = true;
            plugin.selectTab($tab);
          } else if (
            !$defaultTab.hasClass(settings.tabActiveClass) &&
            !settings.cycle
          ) {
            if (
              hash === "" ||
              plugin.matchTab(lastHash).length ||
              $container.closest(hash).length
            ) {
              skipUpdateToHash = true;
              plugin.selectTab($defaultTabLink);
            }
          }
        }
      }
    };

    plugin.cycleTabs = function (tabNumber) {
      if (settings.cycle) {
        tabNumber = tabNumber % plugin.tabs.length;
        $tab = $(plugin.tabs[tabNumber]).children("a").first();
        skipUpdateToHash = true;
        plugin.selectTab($tab, function () {
          setTimeout(function () {
            plugin.cycleTabs(tabNumber + 1);
          }, settings.cycle);
        });
      }
    };

    plugin.publicMethods = {
      select: function (tabSelector) {
        var $tab;
        if (typeof tabSelector == "object") {
          tabSelector = tabSelector[0];
        }
        if (($tab = plugin.tabs.filter(tabSelector)).length === 0) {
          if (
            ($tab = plugin.tabs.find("a[href='" + tabSelector + "']"))
              .length === 0
          ) {
            if (($tab = plugin.tabs.find("a" + tabSelector)).length === 0) {
              if (
                ($tab = plugin.tabs.find("[data-target='" + tabSelector + "']"))
                  .length === 0
              ) {
                if (
                  ($tab = plugin.tabs.find("a[href$='" + tabSelector + "']"))
                    .length === 0
                ) {
                  $.error(
                    "Tab '" + tabSelector + "' does not exist in tab set",
                  );
                }
              }
            }
          }
        } else {
          $tab = $tab.children("a").first();
        }
        plugin.selectTab($tab);
      },
    };

    // =============================================================
    // Private functions
    // =============================================================

    var fire = function (obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    };

    var addClasses = function () {
      $container.addClass(settings.containerClass);
      plugin.tabs.parent().addClass(settings.tabsClass);
      plugin.tabs.addClass(settings.tabClass);
      plugin.panels.addClass(settings.panelClass);
    };

    var setDefaultTab = function () {
      var hash = window.location.hash.match(/^[^\?]*/)[0],
        $selectedTab = plugin.matchTab(hash).parent(),
        $panel;

      if ($selectedTab.length === 1) {
        $defaultTab = $selectedTab;
        settings.cycle = false;
      } else {
        $panel = plugin.matchInPanel(hash);

        if ($panel.length) {
          hash = "#" + $panel.attr("id");
          $defaultTab = plugin.matchTab(hash).parent();
        } else {
          $defaultTab = plugin.tabs.parent().find(settings.defaultTab);
          if ($defaultTab.length === 0) {
            $.error(
              "The specified default tab ('" +
                settings.defaultTab +
                "') could not be found in the tab set ('" +
                settings.tabs +
                "') out of " +
                plugin.tabs.length +
                " tabs.",
            );
          }
        }
      }

      $defaultTabLink = $defaultTab.children("a").first();

      activateDefaultTab($selectedTab);
    };

    var activateDefaultTab = function ($selectedTab) {
      var defaultPanel, defaultAjaxUrl;

      if (
        settings.collapsible &&
        $selectedTab.length === 0 &&
        settings.collapsedByDefault
      ) {
        $defaultTab
          .addClass(settings.collapsedClass)
          .children()
          .addClass(settings.collapsedClass);
      } else {
        defaultPanel = $($defaultTab.data("easytabs").panel);
        defaultAjaxUrl = $defaultTab.data("easytabs").ajax;

        if (
          defaultAjaxUrl &&
          (!settings.cache || !$defaultTab.data("easytabs").cached)
        ) {
          $container.trigger("easytabs:ajax:beforeSend", [
            $defaultTabLink,
            defaultPanel,
          ]);
          defaultPanel.load(defaultAjaxUrl, function (response, status, xhr) {
            $defaultTab.data("easytabs").cached = true;
            $container.trigger("easytabs:ajax:complete", [
              $defaultTabLink,
              defaultPanel,
              response,
              status,
              xhr,
            ]);
          });
        }

        $defaultTab
          .data("easytabs")
          .panel.show()
          .addClass(settings.panelActiveClass);

        $defaultTab
          .addClass(settings.tabActiveClass)
          .children()
          .addClass(settings.tabActiveClass);
      }

      $container.trigger("easytabs:initialised", [
        $defaultTabLink,
        defaultPanel,
      ]);
    };

    var bindToTabClicks = function () {
      plugin.tabs.children("a").bind(settings.bind_str, function (e) {
        settings.cycle = false;
        skipUpdateToHash = false;
        plugin.selectTab($(this));
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      });
    };

    var activateTab = function ($clicked, $targetPanel, ajaxUrl, callback) {
      plugin.panels.stop(true, true);

      if (
        fire($container, "easytabs:before", [$clicked, $targetPanel, settings])
      ) {
        var $visiblePanel = plugin.panels.filter(":visible"),
          $panelContainer = $targetPanel.parent(),
          targetHeight,
          visibleHeight,
          heightDifference,
          showPanel,
          hash = window.location.hash.match(/^[^\?]*/)[0];

        if (settings.animate) {
          targetHeight = getHeightForHidden($targetPanel);
          visibleHeight = $visiblePanel.length
            ? setAndReturnHeight($visiblePanel)
            : 0;
          heightDifference = targetHeight - visibleHeight;
        }

        lastHash = hash;
        showPanel = function () {
          $container.trigger("easytabs:midTransition", [
            $clicked,
            $targetPanel,
            settings,
          ]);
          if (settings.animate && settings.transitionIn == "fadeIn") {
            if (heightDifference > 0) {
              $panelContainer.animate(
                {
                  height: $panelContainer.height() + heightDifference,
                },
                transitions.halfSpeed,
              );
            }
          }

          if (settings.updateHash && !skipUpdateToHash) {
            var attr_id =
              $targetPanel.attr("id") == "profiel"
                ? "/"
                : "/" + $targetPanel.attr("id").replace("_", "/");
            skipUpdateToHash = false;
          } else {
            skipUpdateToHash = false;
          }

          $(".loading-screen")
            .css({
              "background-color": "transparent",
              color: "white",
            })
            .fadeIn(600);
          imagesLoaded("#" + $targetPanel.attr("id"), function () {
            $(".loading-screen").hide();
            $targetPanel[transitions.show](
              600,
              settings.transitionInEasing,
              function () {
                $panelContainer.css({ height: "", "min-height": "" });
                $container.trigger("easytabs:after", [
                  $clicked,
                  $targetPanel,
                  settings,
                ]);
                if (typeof callback == "function") {
                  callback();
                }
              },
            );
          });
        };

        if (
          ajaxUrl &&
          (!settings.cache || !$clicked.parent().data("easytabs").cached)
        ) {
          $container.trigger("easytabs:ajax:beforeSend", [
            $clicked,
            $targetPanel,
          ]);
          $targetPanel.load(ajaxUrl, function (response, status, xhr) {
            $clicked.parent().data("easytabs").cached = true;
            $container.trigger("easytabs:ajax:complete", [
              $clicked,
              $targetPanel,
              response,
              status,
              xhr,
            ]);
          });
        }

        if (settings.animate && settings.transitionOut == "fadeOut") {
          if (heightDifference < 0) {
            $panelContainer
              .animate(
                {
                  height: $panelContainer.height() + heightDifference,
                },
                transitions.halfSpeed,
              )
              .css({ "min-height": "" });
          } else {
            $panelContainer.css({ "min-height": $panelContainer.height() });
          }
        }

        plugin.tabs
          .filter("." + settings.tabActiveClass)
          .removeClass(settings.tabActiveClass)
          .children()
          .removeClass(settings.tabActiveClass);
        plugin.tabs
          .filter("." + settings.collapsedClass)
          .removeClass(settings.collapsedClass)
          .children()
          .removeClass(settings.collapsedClass);
        $clicked
          .parent()
          .addClass(settings.tabActiveClass)
          .children()
          .addClass(settings.tabActiveClass);

        plugin.panels
          .filter("." + settings.panelActiveClass)
          .removeClass(settings.panelActiveClass);
        $targetPanel.addClass(settings.panelActiveClass);

        if ($visiblePanel.length) {
          $visiblePanel[transitions.hide](
            transitions.speed,
            settings.transitionOutEasing,
            showPanel,
          );
        } else {
          $targetPanel[transitions.uncollapse](
            transitions.speed,
            settings.transitionUncollapseEasing,
            showPanel,
          );
        }
      }
    };

    var getHeightForHidden = function ($targetPanel) {
      if (
        $targetPanel.data("easytabs") &&
        $targetPanel.data("easytabs").lastHeight
      ) {
        return $targetPanel.data("easytabs").lastHeight;
      }

      var display = $targetPanel.css("display"),
        outerCloak,
        height;

      try {
        outerCloak = $("<div></div>", {
          position: "absolute",
          visibility: "hidden",
          overflow: "hidden",
        });
      } catch (e) {
        outerCloak = $("<div></div>", {
          visibility: "hidden",
          overflow: "hidden",
        });
      }
      height = $targetPanel
        .wrap(outerCloak)
        .css({ position: "relative", visibility: "hidden", display: "block" })
        .outerHeight();

      $targetPanel.unwrap();

      $targetPanel.css({
        position: $targetPanel.data("easytabs").position,
        visibility: $targetPanel.data("easytabs").visibility,
        display: display,
      });

      $targetPanel.data("easytabs").lastHeight = height;

      return height;
    };

    var setAndReturnHeight = function ($visiblePanel) {
      var height = $visiblePanel.outerHeight();

      if ($visiblePanel.data("easytabs")) {
        $visiblePanel.data("easytabs").lastHeight = height;
      } else {
        $visiblePanel.data("easytabs", { lastHeight: height });
      }
      return height;
    };

    var initHashChange = function () {
      if (typeof $(window).hashchange === "function") {
        $(window).hashchange(function () {
          plugin.selectTabFromHashChange();
        });
      } else if ($.address && typeof $.address.change === "function") {
        $.address.change(function () {
          plugin.selectTabFromHashChange();
        });
      }
    };

    var initCycle = function () {
      var tabNumber;
      if (settings.cycle) {
        tabNumber = plugin.tabs.index($defaultTab);
        setTimeout(function () {
          plugin.cycleTabs(tabNumber + 1);
        }, settings.cycle);
      }
    };

    plugin.init();
  };

  $.fn.easytabs = function (options) {
    var args = arguments;

    return this.each(function () {
      var $this = $(this),
        plugin = $this.data("easytabs");

      if (undefined === plugin) {
        plugin = new $.easytabs(this, options);
        $this.data("easytabs", plugin);
      }

      if (plugin.publicMethods[options]) {
        return plugin.publicMethods[options](
          Array.prototype.slice.call(args, 1),
        );
      }
    });
  };
})(jQuery);
