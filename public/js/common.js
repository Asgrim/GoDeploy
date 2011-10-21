/**
 * GoDeploy deployment application
 * Copyright (C) 2011 the authors listed in AUTHORS file
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright 2011 GoDeploy
 * @author See AUTHORS file
 * @link http://www.godeploy.com/
 */

function hookExternalLinks()
{
	var links=document.getElementsByTagName('a');
	for (var i=0; i<links.length; i++)
	{
		if (links[i].rel == 'external' || links[i].rel == "nofollow")
		{
			links[i].onclick = function() {
				return makeExternal(this);
			};
		}
		if (links[i].rel == 'popup')
		{
			links[i].onclick = function() {
				details = this.className;
				details = details.split('|');
				attribs = '';
				attribs += "scrollbars=" + details[3] + ",";
				attribs += "resizable=" + details[4];

				centre = details[5];
				if (typeof(centre) != 'undefined')
				{
					attribs += ",left=" + (screen.availWidth - details[1]) / 2 + ",";
					attribs += "top=" + (screen.availHeight - details[2]) / 2;
				}

				return popup(this.href, details[0], details[1], details[2], attribs);
			};
		}
	}
}
$(document).observe("dom:loaded", hookExternalLinks);
function makeExternal(a)
{
	return !window.open(a.href);
}

String.prototype.trim = function() {
	return this.replace(/^\s*|\s*$/g, '');
};
String.prototype.ucwords = function() {
	return this.replace(/\b\w/gi, function(c) { return c.toUpperCase(); });
};

function pngFix()
{
	var arVersion = navigator.appVersion.split("MSIE")
	var version = parseFloat(arVersion[1])

	if ((version >= 5.5) && (version < 7) && (document.body.filters))
	{
		var images = document.images;
		for (var i=0; i<images.length; i++)
		{
			var img = images[i];
			if (css.elementHasClass(img, "no_fix")) continue;
			var imgName = img.src.toUpperCase();
			if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
			{
				var imgID = (img.id) ? "id='" + img.id + "' " : "";
				var imgClass = (img.className) ? "class='" + img.className + "' " : "";
				var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
				var imgStyle = "display: block;" + img.style.cssText;
				if (img.align == "left") imgStyle = "float:left;" + imgStyle;
				if (img.align == "right") imgStyle = "float:right;" + imgStyle;
				if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
				var strNewHTML = "<span " + imgID + imgClass + imgTitle
				+ " style=\"" + "width: " + img.width + "px; height: " + img.height + "px;" + imgStyle + ";"
				+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
				+ "(src=\'" + img.src + "\', sizingMethod='scale');\">&nbsp;</span>";
				img.outerHTML = strNewHTML;
				i = i-1;
			}
		}
	}
}
$(document).observe("dom:loaded", pngFix);