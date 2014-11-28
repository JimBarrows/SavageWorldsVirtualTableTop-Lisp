package org.savageworlds.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class SkillDescription implements Serializable{

	/**
	 * 
	 */
	private static final long	serialVersionUID	= 1L;

	@Id
	@GeneratedValue
	private Long	id;

	@NotNull
	private String	name;
	
	@NotNull
	private AttributeTypes attribute;
	
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public AttributeTypes getAttribute() {
		return attribute;
	}

	public void setAttribute(AttributeTypes attribute) {
		this.attribute = attribute;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}