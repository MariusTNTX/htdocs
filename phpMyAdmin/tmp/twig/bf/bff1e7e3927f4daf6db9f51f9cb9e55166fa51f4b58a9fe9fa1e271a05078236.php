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

/* database/triggers/editor_form.twig */
class __TwigTemplate_d64241d937f85f3561c38c124e696fa4442705abf68f79bd6df56ebeabe41e4e extends Template
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
        echo "<form class=\"rte_form\" action=\"";
        echo PhpMyAdmin\Url::getFromRoute("/database/triggers");
        echo "\" method=\"post\">
  ";
        // line 2
        echo PhpMyAdmin\Url::getHiddenInputs(($context["db"] ?? null), ($context["table"] ?? null));
        echo "
  <input name=\"";
        // line 3
        echo ((($context["is_edit"] ?? null)) ? ("edit_item") : ("add_item"));
        echo "\" type=\"hidden\" value=\"1\">
  ";
        // line 4
        if (($context["is_edit"] ?? null)) {
            // line 5
            echo "    <input name=\"item_original_name\" type=\"hidden\" value=\"";
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "item_original_name", [], "any", false, false, false, 5), "html", null, true);
            echo "\">
  ";
        }
        // line 7
        echo "  ";
        if (($context["is_ajax"] ?? null)) {
            // line 8
            echo "    <input type=\"hidden\" name=\"";
            echo ((($context["is_edit"] ?? null)) ? ("editor_process_edit") : ("editor_process_add"));
            echo "\" value=\"true\">
    <input type=\"hidden\" name=\"ajax_request\" value=\"true\">
  ";
        }
        // line 11
        echo "
  <div class=\"card\">
    <div class=\"card-header\">
      ";
echo _gettext("Details");
        // line 15
        echo "      ";
        if ( !($context["is_edit"] ?? null)) {
            // line 16
            echo "        ";
            echo PhpMyAdmin\Html\MySQLDocumentation::show("CREATE_TRIGGER");
            echo "
      ";
        }
        // line 18
        echo "    </div>

    <div class=\"card-body\">
      <table class=\"rte_table table table-borderless table-sm\">
        <tr>
          <td>";
echo _gettext("Trigger name");
        // line 23
        echo "</td>
          <td><input type=\"text\" name=\"item_name\" maxlength=\"64\" value=\"";
        // line 24
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "item_name", [], "any", false, false, false, 24), "html", null, true);
        echo "\"></td>
        </tr>
        <tr>
          <td>";
echo _gettext("Table");
        // line 27
        echo "</td>
          <td>
            <select name=\"item_table\">
              ";
        // line 30
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["tables"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["item_table"]) {
            // line 31
            echo "                <option value=\"";
            echo twig_escape_filter($this->env, $context["item_table"], "html", null, true);
            echo "\"";
            echo ((((($context["is_edit"] ?? null) && (0 === twig_compare($context["item_table"], twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "item_table", [], "any", false, false, false, 31)))) || ( !($context["is_edit"] ?? null) && (0 === twig_compare($context["item_table"], ($context["table"] ?? null)))))) ? (" selected") : (""));
            echo ">";
            echo twig_escape_filter($this->env, $context["item_table"], "html", null, true);
            echo "</option>
              ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item_table'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 33
        echo "            </select>
          </td>
        </tr>
        <tr>
          <td>";
echo _pgettext("Trigger action time", "Time");
        // line 37
        echo "</td>
          <td>
            <select name=\"item_timing\">
              ";
        // line 40
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["time"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["item_time"]) {
            // line 41
            echo "                <option value=\"";
            echo twig_escape_filter($this->env, $context["item_time"], "html", null, true);
            echo "\"";
            echo (((0 === twig_compare(twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "item_action_timing", [], "any", false, false, false, 41), $context["item_time"]))) ? (" selected") : (""));
            echo ">";
            echo twig_escape_filter($this->env, $context["item_time"], "html", null, true);
            echo "</option>
              ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item_time'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 43
        echo "            </select>
          </td>
        </tr>
        <tr>
          <td>";
echo _gettext("Event");
        // line 47
        echo "</td>
          <td>
            <select name=\"item_event\">
              ";
        // line 50
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["events"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["event"]) {
            // line 51
            echo "                <option value=\"";
            echo twig_escape_filter($this->env, $context["event"], "html", null, true);
            echo "\"";
            echo (((0 === twig_compare(twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "item_event_manipulation", [], "any", false, false, false, 51), $context["event"]))) ? (" selected") : (""));
            echo ">";
            echo twig_escape_filter($this->env, $context["event"], "html", null, true);
            echo "</option>
              ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['event'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 53
        echo "            </select>
          </td>
        </tr>
        <tr>
          <td>";
echo _gettext("Definition");
        // line 57
        echo "</td>
          <td><textarea name=\"item_definition\" rows=\"15\" cols=\"40\">";
        // line 58
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "item_definition", [], "any", false, false, false, 58), "html", null, true);
        echo "</textarea></td>
        </tr>
        <tr>
          <td>";
echo _gettext("Definer");
        // line 61
        echo "</td>
          <td><input type=\"text\" name=\"item_definer\" value=\"";
        // line 62
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "item_definer", [], "any", false, false, false, 62), "html", null, true);
        echo "\"></td>
        </tr>
      </table>
    </div>

  ";
        // line 67
        if ( !($context["is_ajax"] ?? null)) {
            // line 68
            echo "    <div class=\"card-footer\">
      <input class=\"btn btn-primary\" type=\"submit\" name=\"";
            // line 69
            echo ((($context["is_edit"] ?? null)) ? ("editor_process_edit") : ("editor_process_add"));
            echo "\" value=\"";
echo _gettext("Go");
            echo "\">
    </div>
  ";
        }
        // line 72
        echo "  </div>
</form>
";
    }

    public function getTemplateName()
    {
        return "database/triggers/editor_form.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  222 => 72,  214 => 69,  211 => 68,  209 => 67,  201 => 62,  198 => 61,  191 => 58,  188 => 57,  181 => 53,  168 => 51,  164 => 50,  159 => 47,  152 => 43,  139 => 41,  135 => 40,  130 => 37,  123 => 33,  110 => 31,  106 => 30,  101 => 27,  94 => 24,  91 => 23,  83 => 18,  77 => 16,  74 => 15,  68 => 11,  61 => 8,  58 => 7,  52 => 5,  50 => 4,  46 => 3,  42 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "database/triggers/editor_form.twig", "C:\\Apache24\\htdocs\\phpMyAdmin\\templates\\database\\triggers\\editor_form.twig");
    }
}
