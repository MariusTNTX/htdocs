<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* table/operations/view.twig */
class __TwigTemplate_c1018b31accb2554886acd17645f0dff1ef008dac3627e3ce1012cd85c92725f extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<div class=\"container-fluid\">
  <form method=\"post\" action=\"";
        // line 2
        echo PhpMyAdmin\Url::getFromRoute("/view/operations");
        echo "\">
    ";
        // line 3
        echo PhpMyAdmin\Url::getHiddenInputs(($context["db"] ?? null), ($context["table"] ?? null));
        echo "
    <input type=\"hidden\" name=\"reload\" value=\"1\">
    <input type=\"hidden\" name=\"submitoptions\" value=\"1\">

    <div class=\"card mb-2\">
      <div class=\"card-header\">";
echo _gettext("Operations");
        // line 8
        echo "</div>
      <div class=\"card-body\">
        <div class=\"row row-cols-lg-auto g-3 align-items-center\">
          <div class=\"col-12\">
            <label for=\"newNameInput\">";
echo _gettext("Rename view to");
        // line 12
        echo "</label>
          </div>
          <div class=\"col-12\">
            <input id=\"newNameInput\" class=\"form-control\" type=\"text\" name=\"new_name\" onfocus=\"this.select()\" value=\"";
        // line 15
        echo twig_escape_filter($this->env, ($context["table"] ?? null), "html", null, true);
        echo "\" required>
          </div>
        </div>
      </div>
      <div class=\"card-footer text-end\">
        <input class=\"btn btn-primary\" type=\"submit\" value=\"";
echo _gettext("Go");
        // line 20
        echo "\">
      </div>
    </div>
  </form>

  <div class=\"card mb-2\">
    <div class=\"card-header\">";
echo _gettext("Delete data or table");
        // line 26
        echo "</div>
    <div class=\"card-body\">
      <div class=\"card-text\">
        ";
        // line 29
        echo PhpMyAdmin\Html\Generator::linkOrButton(PhpMyAdmin\Url::getFromRoute("/sql"), twig_array_merge(        // line 31
($context["url_params"] ?? null), ["sql_query" => ("DROP VIEW " . PhpMyAdmin\Util::backquote(        // line 32
($context["table"] ?? null))), "goto" => PhpMyAdmin\Url::getFromRoute("/table/structure"), "reload" => true, "purge" => true, "message_to_show" => twig_escape_filter($this->env, twig_sprintf(_gettext("View %s has been dropped."),         // line 36
($context["table"] ?? null))), "table" =>         // line 37
($context["table"] ?? null)]), _gettext("Delete the view (DROP)"), ["id" => "drop_view_anchor", "class" => "text-danger ajax"]);
        // line 44
        echo "
        ";
        // line 45
        echo PhpMyAdmin\Html\MySQLDocumentation::show("DROP VIEW");
        echo "
      </div>
    </div>
  </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "table/operations/view.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  97 => 45,  94 => 44,  92 => 37,  91 => 36,  90 => 32,  89 => 31,  88 => 29,  83 => 26,  74 => 20,  65 => 15,  60 => 12,  53 => 8,  44 => 3,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "table/operations/view.twig", "C:\\Apache24\\htdocs\\phpMyAdmin\\templates\\table\\operations\\view.twig");
    }
}
